const renderMarkedContent = require('./lib/marked');
const pick = require('lodash/fp/pick');
const uniq = require('lodash/uniq');
const uniqBy = require('lodash/uniqBy');
const flattendeep = require('lodash/flattenDeep');
const slugify = require('slug');
const { filter } = require('lodash');

/**
 * @typedef Dato
 * @type {object} - DatoCMS API object
 */

/**
 * @typedef Root
 * @type {object} - Dato Filesystem API
 */

/**
 * @typedef i18n
 * @type {object}
 * @property {string} locale - Current language in ISO 639-1
 * @property {string[]} availableLocales - Available languages in ISO 639-1
 */

/**
 * @typedef DatoRecord
 * @type {object}
 */

/**
 * @typedef linkObject
 * @type {object}
 * @property {title} title - Human-readable name
 * @property {slug} slug - Machine-readable name
 * @property {path} path - Resource location
 */

const includeUnpublished = !!process.env.UNPUBLISHED;
const contentBasePath = '/narratives';

module.exports = (dato, root, i18n) => {
  generateChapters(dato, root, i18n);
  generateChapterOverview(dato, root, i18n);
  generateByInfluence(dato, root, i18n);
  generateByGoal(dato, root, i18n);
  generateByMethodology(dato, root, i18n);
  generateKeywords(dato, root, i18n);
  generateAppData(dato, root, i18n);
  generateStaticPages(dato, root, i18n);
  generateThemes(dato, root, i18n);
  generateMarkers(dato, root, i18n);
  generateEventPages(dato, root, i18n);
  generateFeaturePages(dato, root, i18n);
  generateNewsPages(dato, root, i18n);
};

/**
 * Write out Book JSON
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateChapterOverview (dato, root, i18n) {
  const allChapters = getAllChapters(dato);
  root.createDataFile(`static/data/chapters/index.json`, 'json', allChapters);
}

/**
 * Write out Chapter JSONs
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateChapters (dato, root, i18n) {
  const chapters = getChapters(dato);
  for (const chapter of chapters) {
    if (chapter.book != null) { // so that null result will not be written out
      root.createDataFile(`static/data/books/${chapter.book.slug}/chapters/${chapter.slug}/index.json`, 'json', chapter);
    } else {
      console.info(`Skipped chapter ${chapter.title}, book is null`);
    }
  }
}

/**
 * Write out JSON files by influence tag
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateByInfluence (dato, root, i18n) {
  const influences = getInfluences(dato);
  const chapters = getChapters(dato)
    .filter(chapter => chapter.influences)
    .map(chapter => {
      delete chapter.pages;
      delete chapter.keywords;
      return chapter;
    });

  for (const influence of influences) {
    const chaptersByInfluences = chapters
      .filter(chapter => chapter.influences)
      .filter(chapter => chapter.influences.some(chapterInfluence => chapterInfluence.slug === influence.slug));
    root.createDataFile(`static/data/influences/${influence.slug}.json`, 'json', { ...influence, entries: chaptersByInfluences });
  }
}

/**
 * Write out JSON files by goal tag
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateByGoal (dato, root, i18n) {
  const goals = getGoals(dato);
  const chapters = getChapters(dato)
    .filter(chapter => chapter.goals)
    .map(chapter => {
      delete chapter.pages;
      delete chapter.keywords;
      return chapter;
    });

  for (const goal of goals) {
    const chaptersByGoals = chapters
      .filter(chapter => chapter.goals)
      .filter(chapter => chapter.goals.some(chapterGoal => chapterGoal.slug === goal.slug));
    root.createDataFile(`static/data/goals/${goal.slug}.json`, 'json', { ...goal, entries: chaptersByGoals });
  }
}

/**
 * Write out JSON files by methodology tag
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateByMethodology (dato, root, i18n) {
  const methodologies = getMethodologies(dato);
  const chapters = getChapters(dato)
    .filter(chapter => chapter.methodologies)
    .map(chapter => {
      delete chapter.pages;
      delete chapter.keywords;
      return chapter;
    });

  for (const methodology of methodologies) {
    const chaptersByMethodology = chapters
      .filter(chapter => chapter.methodologies)
      .filter(chapter => chapter.methodologies.some(chapterMethodology => chapterMethodology.slug === methodology.slug));
    root.createDataFile(`static/data/methodologies/${methodology.slug}.json`, 'json', { ...methodology, entries: chaptersByMethodology });
  }
}

function generateKeywords (dato, root, i18n) {
  const keywords = uniqBy(dato.books
    .filter(filterPublished)
    .map(book => {
      return getChapters(dato, book)
        .filter(filterPublished)
        .map(({pages}) => pages.map(page => page.keywords).flat()).flat();
    })
    .flat(), 'slug');

  root.createDataFile(`static/data/keywords/index.json`, 'json', keywords);
}

function generateMarkers (dato, root, i18n) {
  const events = [...dato.externalEvents, ...dato.internalEvents]
    .map(event => {
      return {
        type: 'event',
        location: event.geolocation,
        theme: { slug: 'event' },
      };
  });

  const pages = flattendeep(dato.books
    .filter(filterPublished)
    .map(book => {
      return book.chapters
        .filter(filterPublished)
        .map(chapter => {
          const chapterSlug = chapter.slug;
          return chapter.pages.map(page => {
            if (page.location) {
              return {
                type: chapterSlug,
                keywords: page.keywords.split(',').map(string => slugify(string)),
                location: page.location,
                theme: {
                  slug: page.theme ? page.theme.slug : 'too-much',
                },
                path: `/narratives/${book.slug}/${chapterSlug}#${page.slug}`,
              };
            } else {
              return false;
            }
          })
            .filter(Boolean);
        });
    }));
  root.createDataFile(`static/data/markers/index.json`, 'json', [...pages, ...events]);
}

/**
 * Write out JSON file containing all filters
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateAppData (dato, root, i18n) {
  const description = dato.app.description;

  const highlightedEvent = dato.app.highlightedEvent && dato.app.highlightedEvent.isPublished ? {
    name: dato.app.highlightedEvent.name,
    slug: dato.app.highlightedEvent.slug,
    startDate: dato.app.highlightedEvent.startDate,
    endDate: dato.app.highlightedEvent.endDate,
    imageUrl: `${dato.app.highlightedEvent.image.imgixHost}${dato.app.highlightedEvent.image.value.path}`,
    bannerIcon: dato.app.highlightedEvent.bannerIconSmall,
    displayDate: dato.app.highlightedEvent.displayDate,
  } : null;

  const filters = dato.app.filters.map(filter => {
    return {
      title: filter.title,
      slug: filter.slug,
      description: renderMarkedContent(filter.body),
      filterItems: filter.filterItems.map(filterItem => {
        return {
          title: filterItem.title,
          slug: filterItem.slug,
          description: renderMarkedContent(filterItem.body),
          feature: filterItem.feature ? {
            title: filterItem.feature.title,
            slug: filterItem.feature.slug,
          } : null,
          icon: filterItem.icon,
        };
      }),
    };
  });

  const navigationLinks = {
    mainNavigation: [
      {
        title: 'Events',
        slug: 'events',
      },
      {
        title: 'Submit story',
        slug: 'submit-a-story',
      },
    ],
    subNavigation: dato.app.footerLinks.map(footerLink => {
      return {
        title: footerLink.title,
        slug: footerLink.slug,
      };
    }),
  };

  const app = {
    description,
    highlightedEvent,
    filters,
    navigationLinks,
  };

  root.createDataFile(`static/data/app.json`, 'json', app);
}

/**
 * Write out JSON files by theme
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateThemes (dato, root, i18n) {
  const themes = getThemes(dato);
  const chapters = getChapters(dato)
    .filter(chapter => chapter.theme)
    .map(chapter => {
      delete chapter.pages;
      delete chapter.keywords;
      delete chapter.influences;
      delete chapter.goals;
      return chapter;
    });
  for (const theme of themes) {
    const chaptersByTheme = chapters.filter(chapter => chapter.theme.slug === theme.slug);
    root.createDataFile(`static/data/themes/${theme.slug}.json`, 'json', { ...theme, entries: chaptersByTheme });
  }
}

/**
 * Write out JSON files for static pages
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateStaticPages (dato, root, i18n) {
  const staticPages = dato.staticPages
    .filter(filterPublished)
    .map(page => {
      const { body, images, slug, title, video } = page;
      return {
        body: renderMarkedContent(body),
        images,
        slug,
        title,
        video,
      };
    });
  for (const page of staticPages) {
    root.createDataFile(`static/data/static-pages/${page.slug}.json`, 'json', page);
  }
  const staticPageIndex = staticPages.map(page => ({ path: `/${page.slug}` }));
  root.createDataFile('static/data/static-pages/index.json', 'json', staticPageIndex);
}

/**
 * Write out JSON files for event pages
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateEventPages (dato, root, i18n) {
  const externalEvents = dato.externalEvents
    .filter(filterPublished)
    .map(event => {
      return {
        id: event.id,
        name: event.name,
        startDate: event.startDate,
        endDate: event.endDate,
        displayDate: event.displayDate,
        summary: event.summary,
        location: event.location,
        url: event.url,
        urlLabel: event.urlLabel,
        geolocation: {
          latitude: event.geolocation.latitude,
          longitude: event.geolocation.longitude,
        },
        image: {
          url: event.image.url(),
          width: event.image.width,
          height: event.image.height,
        },
      };
    });

  const internalEvents = dato.internalEvents
    .filter(externalEvent => {
      return externalEvent.isPublished === true;
    })
    .map(event => {
      return {
        id: event.id,
        name: event.name,
        slug: event.slug,
        startDate: event.startDate,
        endDate: event.endDate,
        displayDate: event.displayDate,
        summary: event.summary,
        location: event.location,
        geolocation: {
          latitude: event.geolocation.latitude,
          longitude: event.geolocation.longitude,
        },
        image: {
          url: event.image.url(),
          width: event.image.width,
          height: event.image.height,
        },
      };
    });

  const eventPageIndex = {
    allExternalEvents: externalEvents,
    allInternalEvents: internalEvents,
  };

  root.createDataFile('static/data/events/index.json', 'json', eventPageIndex);

  const chapters = getChapters(dato);

  i18n.availableLocales.forEach(locale => {
    i18n.withLocale(locale, () => {
      const internalEventPages = dato.internalEvents
        .filter(filterPublished)
        .map(page => {
          const { slug, name, eventWebsite, visuallyHideName, displayDate, image, bannerIcon, bannerTagline } = page;

          const sections = page.sections.map(section => {
            const { backgroundColor, showBottomWave, showTopWave } = section;

            const sectionBlocks = section.blocks.map(block => {
              if(block.itemType.apiKey === 'chapters_block') {
                return {
                  _modelApiKey: block.itemType.apiKey,
                  id: block.id,
                  title: block.title,
                  slug: block.slug,
                  chapters: block.chapters.map(chapter => {
                    generateEventChapter(chapter, page, root, i18n);
                    return {
                      title: chapter.title,
                      slug: chapter.slug,
                      coverUrl: chapter.cover.url(),
                    };
                  }),
                };
              }
              if(block.itemType.apiKey === 'colofon_block') {
                return {
                  _modelApiKey: block.itemType.apiKey,
                  id: block.id,
                  title: block.title,
                  slug: block.slug,
                  titleColor: block.titleColor,
                  showWaveMarker: block.showWaveMarker,
                  body: renderMarkedContent(block.body),
                  logos: block.logos.map(logo => {
                    return {
                      id: logo.id,
                      url: logo.url(),
                      alt: logo.alt,
                    };
                  }),
                };
              }
              if(block.itemType.apiKey === 'text_block') {
                return {
                  _modelApiKey: block.itemType.apiKey,
                  id: block.id,
                  title: block.title,
                  slug: block.slug,
                  titleColor: block.titleColor,
                  showWaveMarker: block.showWaveMarker,
                  body: renderMarkedContent(block.body),
                  callToActionLabel: block.callToActionLabel,
                  callToActionUrl: block.callToActionUrl,
                };
              }
              if(block.itemType.apiKey === 'media_block') {
                return {
                  _modelApiKey: block.itemType.apiKey,
                  id: block.id,
                  title: block.title,
                  slug: block.slug,
                  titleColor: block.titleColor,
                  showWaveMarker: block.showWaveMarker,
                  body: renderMarkedContent(block.body),
                  internalButtonLabel: block.internalButtonLabel,
                  internalButtonSlug: block.internalButtonSlug,
                  callToActionLabel: block.callToActionLabel,
                  callToActionUrl: block.callToActionUrl,
                  mirrorLayout: block.mirrorLayout,
                  image: {
                    alt: block.image.alt,
                    url: block.image.url(),
                  },
                };
              }
              if(block.itemType.apiKey === 'related_stories_block') {
                const linkedChapters = block.linkedChapters.map(linkedChapter => {
                  const chapter = chapters.find(chapter => chapter.slug === linkedChapter.slug);
                  const bookSlug = chapter.book.slug;

                  return {
                    title: chapter.title,
                    chapterSlug: chapter.slug,
                    bookSlug,
                    coverUrl: `${chapter.cover.imgixHost}${chapter.cover.value.path}`,
                  };
                });

                return {
                  _modelApiKey: block.itemType.apiKey,
                  id: block.id,
                  title: block.title,
                  slug: block.slug,
                  subtitle: block.subtitle,
                  titleColor: block.titleColor,
                  showWaveMarker: block.showWaveMarker,
                  linkedChapters: linkedChapters,
                };
              }
              if(block.itemType.apiKey === 'speakers_block') {
                return {
                  _modelApiKey: block.itemType.apiKey,
                  id: block.id,
                  showWaveMarker: block.showWaveMarker,
                  subtitle: block.subtitle,
                  title: block.title,
                  slug: block.slug,
                  titleColor: block.titleColor,
                  speakers: block.speakers.map(speaker => {
                    return {
                      id: speaker.id,
                      name: speaker.name,
                      organization: speaker.organization,
                      subject: speaker.subject,
                      subjectLabel: speaker.subjectLabel,
                      imageUrl: speaker.image.url(),
                    };
                  }),
                };
              }
              if(block.itemType.apiKey === 'schedule_block') {
                return {
                  _modelApiKey: block.itemType.apiKey,
                  id: block.id,
                  slug: block.slug,
                  timezone: block.timezone,
                  timezoneComment: block.timezoneComment,
                  topicLabel: block.topicLabel,
                  scheduleLabel: block.scheduleLabel,
                  nowLabel: block.nowLabel,
                  descriptionLabel: block.descriptionLabel,
                  speakersLabel: block.speakersLabel,
                  eventDays: block.eventDays.map(eventDay => {
                    return {
                      id: eventDay.id,
                      date: eventDay.date,
                      scheduleItems: eventDay.scheduleItems.map(scheduleItem => {
                        return {
                          id: scheduleItem.id,
                          title: scheduleItem.title,
                          topic: scheduleItem.topic,
                          startTime: scheduleItem.startTime,
                          endTime: scheduleItem.endTime,
                          description: scheduleItem.description,
                          watchLabel: scheduleItem.watchLabel,
                          watchUrl: scheduleItem.watchUrl,
                          speakers: scheduleItem.speakers.map(speaker => {
                            return {
                              id: speaker.id,
                              name: speaker.name,
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              }
            });

            return {
              backgroundColor,
              showBottomWave,
              showTopWave,
              blocks: sectionBlocks,
            };
          });

          return {
            slug,
            name,
            eventWebsite,
            visuallyHideName,
            displayDate,
            image,
            bannerIcon,
            bannerTagline,
            allLocales: i18n.availableLocales,
            sections,
          };
        });

      for (const page of internalEventPages) {
        root.createDataFile(`static/data/events/${locale}/${page.slug}.json`, 'json', page);
      }
    });
  });
}

function generateEventChapter(chapter, event, root, i18n) {
  i18n.availableLocales.forEach(locale => {
    i18n.withLocale(locale, () => {
      const { name, eventWebsite, backButtonLabel, chapterNavigationLabel, image } = event;
      const internalEvent = {
        name,
        eventWebsite,
        backButtonLabel,
        chapterNavigationLabel,
        image,
        allLocales: i18n.availableLocales,
      };

      const page = {
        title: chapter.title,
        cover: chapter.cover.url(),
        pages: chapter.pages.map(page => {
          const { slug, title, storyteller, body, video, videoChina, mapboxStyle, creditsTitle, creditsBody } = page;

          let videoComputed = video ? {
            url: page.video.url,
            provider: page.video.provider,
            providerUid: page.video.providerUid,
            width: page.video.width,
            height: page.video.height,
          } : null;

          if (videoChina) {
            const providerUid = /^https:\/\/v\.qq\.com\/x\/page\/([a-z0-9]+)\.html$/.exec(page.videoChina)[1];
            videoComputed = {
              provider: 'qq',
              providerUid: providerUid,
            };
          }

          return {
            slug,
            title,
            storyteller,
            body: renderMarkedContent(body),
            images: page.images.map(image => {
              return {
                id: image.id,
                url: image.url(),
                width: image.width,
                height: image.height,
                title: image.title,
                alt: image.alt,
              };
            }),
            video: videoComputed,
            mapboxStyle,
            files: page.files.map(file => {
              return {
                url: `${file.file.imgixHost}${file.file.value.path}`,
                label: file.title,
              };
            }),
            creditsTitle,
            creditsBody: renderMarkedContent(creditsBody),
            creditsLogos: page.creditsLogos.map(creditsLogo => {
              return {
                url: creditsLogo.url(),
                alt: creditsLogo.alt,
              };
            }),
          };
        }),
        internalEvent,
      };

      root.createDataFile(`static/data/events/${locale}/chapters/${chapter.slug}.json`, 'json', page);
    });
  });
}

/**
 * Get Dato Book entities in a short format
 *
 * @param {Dato} dato
 */
function getAllChapters (dato) {
  return dato.books
    .filter(filterPublished)
    .reduce((out,
      book) => {
      const chapters = getChapters(dato, book)
        .filter(filterPublished)
        .map(({ slug, title, cover, path, updatedAt, pages }) => {
          const influencesFilters = pages.map(page => page.influences
            ? page.influences.map(influence => {
              return influence.slug;
            })
            : [])
            .flat();

          const goalsFilters = pages.map(page => page.goals
            ? page.goals.map(goal => {
              return goal.slug;
            })
            : [])
            .flat();

          const methodologiesFilters = pages.map(page => page.methodologies
            ? page.methodologies.map(methodology => {
              return methodology.slug;
            })
            : [])
            .flat();

          const themesFilters = pages.map(page => page.theme ? page.theme.slug : false).filter(Boolean);
          const narrativeFilter = book.slug;
          const keywords = uniq(pages.map(page => page.keywords.map(keyword => keyword.slug)).flat());

          const filters = uniq(influencesFilters.concat(goalsFilters, methodologiesFilters, themesFilters, narrativeFilter));
          const availableCategories = [
            ...(influencesFilters.length ? ['influences'] : []),
            ...(goalsFilters.length ? ['goals'] : []),
            ...(methodologiesFilters.length ? ['methodologies'] : []),
            ...(themesFilters.length ? ['themes'] : []),
            'narratives',
          ];

          return { slug, title, cover, path, updatedAt, filters, availableCategories, keywords };
        });

      out.push(...chapters);
      return out;
    }, []);
}

/**
 * Get Dato Chapter entities
 *
 * @param {Dato} dato
 * @param {DatoRecord} [book] optional book to get chapters from
*/
function getChapters (dato, bookRef) {
  const chapters = (bookRef) ? bookRef.chapters : dato.chapters;
  return chapters
    .filter(filterPublished)
    .map(chapter => {
      const { title, slug, chapterType, createdAt, updatedAt, cover } = chapter;
      const parentBook = bookRef || getParent(dato, chapter);
      if (!parentBook) {
        console.info(`Skipped chapter ${title}, no parent book found`);
        return false;
      }
      const book = {
        path: `${contentBasePath}/${parentBook.slug}`,
        slug: parentBook.slug,
        title: parentBook.title,
        theme: parentBook.theme,
      };
      const path = `${book.path}/${slug}`;
      const pages = getPages(dato, chapter);
      const theme = getDominantTheme(pages);
      const neighbours = getNeighboursFromArray(chapter, parentBook.chapters);
      const previousChapter = (neighbours.previous) ? {
        path: `${contentBasePath}/${parentBook.slug}/${neighbours.previous.slug}`,
        slug: neighbours.previous.slug,
        title: neighbours.previous.title } : null;
      const nextChapter = (neighbours.next) ? {
        path: `${contentBasePath}/${parentBook.slug}/${neighbours.next.slug}`,
        slug: neighbours.next.slug,
        title: neighbours.next.title } : null;
      const firstLocationPage = pages.filter(page => page.location)[0];
      const storyteller = (firstLocationPage) ? firstLocationPage.storyteller : null;
      const location = (firstLocationPage) ? firstLocationPage.location : null;
      const influences = collectUniqueTags(pages, 'influences');
      const goals = collectUniqueTags(pages, 'goals');
      const methodologies = collectUniqueTags(pages, 'methodologies');
      const keywords = collectUniqueTags(pages, 'keywords');
      const coverFallback = getChapterCover(pages);
      const related = chapter.related.length < 1
        ? []
        : chapter.related
          .map(chapter => ({ ...chapter, pages: getPages(dato, chapter), parent: getParent(dato, chapter) }))
          .filter(chapter => chapter.parent)
          .map(pick(['title', 'slug', 'cover', 'pages', 'parent']))
          .map(item => ({
            ...item,
            bookTitle: item.parent.title,
            path: `${contentBasePath}/${item.parent.slug}/${item.slug}`,
            cover: item.cover ? item.cover : getChapterCover(item.pages),
          }))
          .map(({ pages, parent, ...chapter }) => chapter);

      return {
        book,
        influences,
        goals,
        methodologies,
        location,
        keywords,
        pages,
        pageCount: pages.length,
        path,
        slug,
        storyteller,
        title,
        type: chapterType,
        theme,
        nextChapter,
        previousChapter,
        createdAt,
        updatedAt,
        cover: cover || coverFallback,
        related,
      };
    })
    .filter(Boolean); // Filter falsy chapters (return false)
}

/**
 * Get Dato Page entities
 *
 * @param {Dato} dato
 * @param {DatoRecord} [chapter] optional chapter to get chapters from
*/
function getPages (dato, chapterRef) {
  let pages = [];
  if (chapterRef) {
    pages = chapterRef.pages;
  } else {
    pages = dato.chapters
      .map(chapter => chapter.pages)
      .reduce((a, b) => a.concat(b), []);
  }
  return pages
    .filter(filterPublished)
    .map(page => {
      const { body, files, graphs, images, keywords, slug, title, mapboxStyle } = page;
      const influences = (page.influence) ? page.influence.map(tag => ({
        title: tag.title,
        slug: tag.slug,
        icon: tag.icon,
        path: `/influences/${tag.slug}`,
      })) : [];
      const goals = (page.goal) ? page.goal.map(tag => ({
        title: tag.title,
        slug: tag.slug,
        icon: tag.icon,
        path: `/goals/${tag.slug}`,
      })) : [];
      const methodologies = (page.methodology) ? page.methodology.map(tag => ({
        title: tag.title,
        slug: tag.slug,
        icon: tag.icon,
        path: `/methodologies/${tag.slug}`,
      })) : [];
      const theme = (page.theme) ? {
        title: page.theme.title,
        slug: page.theme.slug,
        icon: page.theme.icon,
        path: `/themes/${page.theme.slug}`,
      } : null;
      const location = (page.location) ? {
        latitude: page.location.latitude,
        longitude: page.location.longitude,
        zoom: page.zoomlevel,
      } : null;
      const parentChapter = chapterRef || getParent(dato, page);
      const parentBook = getParent(dato, parentChapter) || {};
      const book = (parentBook) ? {
        path: `${contentBasePath}/${parentBook.slug}`,
        slug: parentBook.slug,
        title: parentBook.title,
      } : {};
      const chapter = {
        path: `${book.path}/${parentChapter.slug}`,
        slug: parentChapter.slug,
        title: parentChapter.title,
        type: parentChapter.chapterType,
      };
      const path = `${chapter.path}#${slug}`;
      const links = (page.links) ? page.links.split('\n')
        .map(link => {
          const title = (link.match(/\[(.*?)\]/)) ? link.match(/\[(.*?)\]/)[1] : null;
          const path = (link.match(/\((.*)\)/)) ? link.match(/\((.*)\)/)[1] : null;
          return {
            title: title,
            path: path,
          };
        }) : null;
      let video = page.video;
      if (page.videoChina) {
        const providerUid = /^https:\/\/v\.qq\.com\/x\/page\/([a-z0-9]+)\.html$/.exec(page.videoChina)[1];
        video = {
            provider: 'qq',
            providerUid,
        };
      }
      const filesList = files.map(file => {
        return {
          url: `${file.file.imgixHost}${file.file.value.path}`,
          label: file.title,
        };
      });
      return {
        body: renderMarkedContent(body),
        book,
        chapter,
        files: filesList,
        graphs,
        images,
        keywords: (keywords) ? tagStringToLinkObjects(keywords, 'keywords') : [],
        links,
        location,
        influences,
        goals,
        methodologies,
        path,
        slug,
        storyteller: {
          avatar: page.storytellerAvatar,
          name: page.storyteller,
        },
        partner: {
          logo: page.partnerLogo,
          name: page.partnerName,
        },
        theme,
        title,
        video,
        mapboxStyle,
      };
    });
}

/**
 * Get all feature pages
 *
 * @param {Dato} dato
 * @returns {Object}
*/
function generateFeaturePages (dato, root, i18n) {
  const chapters = getChapters(dato);

  const featurePages = dato.features
    .filter(filterPublished)
    .map(page => generateContentPage(chapters, page));

  for (const page of featurePages) {
    root.createDataFile(`static/data/features/${page.slug}.json`, 'json', page);
  }
  const staticPageIndex = featurePages.map(page => {
    return {
      path: `/${page.slug}`,
      title: page.title,
      iconUrl: page.iconUrl,
    };
  });
  root.createDataFile('static/data/features/index.json', 'json', staticPageIndex);
}

/**
 * Get all news pages
 *
 * @param {Dato} dato
 * @returns {Object}
*/
function generateNewsPages (dato, root, i18n) {
  const chapters = getChapters(dato);

  const newsPages = dato.newsArticles
    .filter(filterPublished)
    .map(page => generateContentPage(chapters, page));

  for (const page of newsPages) {
    root.createDataFile(`static/data/news/${page.slug}.json`, 'json', page);
  }
  const staticPageIndex = newsPages.slice(0).reverse().map(page => {
    return {
      slug: page.slug,
      title: page.title,
      date: page.date,
      heroImage: `${page.heroImage.imgixHost}${page.heroImage.value.path}`,
    };
  });
  root.createDataFile('static/data/news/index.json', 'json', staticPageIndex);
}

function generateContentPage (chapters, page) {
  const { slug, title, icon, date, heroImage, sections } = page;
  const sectionsList = sections.toMap()
    .map(section => {
      const sectionBlocks = section.blocks.map(block => {
        if(block.itemType === 'text_block') {
          return {
            _modelApiKey: block.itemType,
            id: block.id,
            title: block.title,
            slug: block.slug,
            titleColor: block.titleColor,
            showWaveMarker: block.showWaveMarker,
            body: renderMarkedContent(block.body),
            callToActionLabel: block.callToActionLabel,
            callToActionUrl: block.callToActionUrl,
          };
        } else if(block.itemType === 'media_block') {
          return {
            _modelApiKey: block.itemType,
            id: block.id,
            title: block.title,
            slug: block.slug,
            titleColor: block.titleColor,
            showWaveMarker: block.showWaveMarker,
            body: renderMarkedContent(block.body),
            internalButtonLabel: block.internalButtonLabel,
            internalButtonSlug: block.internalButtonSlug,
            callToActionLabel: block.callToActionLabel,
            callToActionUrl: block.callToActionUrl,
            mirrorLayout: block.mirrorLayout,
            image: {
              alt: block.image.alt,
              url: block.image.url,
            },
          };
        } else if(block.itemType === 'colofon_block') {
          return {
            _modelApiKey: block.itemType,
            id: block.id,
            title: block.title,
            slug: block.slug,
            titleColor: block.titleColor,
            showWaveMarker: block.showWaveMarker,
            body: renderMarkedContent(block.body),
            logos: block.logos ? block.logos.map(logo => {
              return {
                id: logo.id,
                url: logo.url,
                alt: logo.alt,
              };
            }) : null,
          };
        } else if(block.itemType === 'news_block') {
          return {
            _modelApiKey: block.itemType,
            id: block.id,
            title: block.title,
            slug: block.slug,
            titleColor: block.titleColor,
            showWaveMarker: block.showWaveMarker,
            newsArticles: block.newsArticles ? block.newsArticles.sort((a, b) => new Date(b.date) - new Date(a.date)).map(newsArticle => {
              return {
                id: newsArticle.id,
                slug: newsArticle.slug,
                title: newsArticle.title,
                date: newsArticle.date,
                image: {
                  alt: newsArticle.heroImage.alt,
                  url: newsArticle.heroImage.url,
                },
              };
            }) : null,
          };
        } else if(block.itemType === 'related_stories_block') {
          const linkedChapters = block.linkedChapters.map(linkedChapter => {
            const chapter = chapters.find(chapter => chapter.slug === linkedChapter.slug);
            const bookSlug = chapter.book.slug;

            return {
              title: chapter.title,
              chapterSlug: chapter.slug,
              bookSlug,
              coverUrl: `${chapter.cover.imgixHost}${chapter.cover.value.path}`,
            };
          });

          return {
            _modelApiKey: block.itemType,
            id: block.id,
            title: block.title,
            slug: block.slug,
            subtitle: block.subtitle,
            titleColor: block.titleColor,
            showWaveMarker: block.showWaveMarker,
            linkedChapters,
          };
        }
      });

      return {
        backgroundColor: section.backgroundColor,
        showBottomWave: section.showBottomWave,
        showTopWave: section.showTopWave,
        blocks: sectionBlocks,
      };
  });

  return {
    slug,
    title,
    iconUrl: icon ? `${icon.imgixHost}${icon.value.path}` : null,
    date: date ? date : null,
    heroImage,
    sections: sectionsList,
  };
}

/**
 * Get Dato Influence entities
 *
 * @param {Dato} dato
 * @returns {Object}
*/
function getInfluences (dato) {
  const influences = dato.influences;
  return influences.map(influence => {
    const { body, slug, icon, title } = influence;
    const path = `/influences/${slug}`;
    return {
      body: renderMarkedContent(body),
      path,
      slug,
      icon,
      title,
    };
  });
}

/**
 * Get Dato Goal entities
 *
 * @param {Dato} dato
 * @returns {Object}
*/
function getGoals (dato) {
  const goals = dato.goals;
  return goals.map(goal => {
    const { body, slug, icon, title } = goal;
    const path = `/goals/${slug}`;
    return {
      body: renderMarkedContent(body),
      path,
      slug,
      icon,
      title,
    };
  });
}

/**
 * Get Dato Methodology entities
 *
 * @param {Dato} dato
 * @returns {Object}
*/
function getMethodologies (dato) {
  const methodologies = dato.methodologies;
  return methodologies.map(goal => {
    const { body, slug, icon, title } = goal;
    const path = `/methodologies/${slug}`;
    return {
      body: renderMarkedContent(body),
      path,
      slug,
      icon,
      title,
    };
  });
}

/**
 * Get Dato Theme entities
 *
 * @param {Dato} dato
 * @returns {Object}
*/
function getThemes (dato) {
  const themes = dato.themes;
  return themes.map(theme => {
    const { body, slug, icon, title } = theme;
    const path = `/themes/${slug}`;
    return {
      body: renderMarkedContent(body),
      path,
      slug,
      icon,
      title,
    };
  });
}

/**
 * Get unique array of tags from items
 *
 * @param {object[]} items
 * @returns {linkObject[]} theme
 */
function collectUniqueTags (items, tagType) {
  return items
    .map(item => item[tagType])
    .reduce((all, item) => all.concat(item), [])
    .filter((item, index, all) => {
      const slugs = all.map(a => a.slug);
      return slugs.indexOf(item.slug) === index;
    });
}

/**
 * filter item based on published flag,
 * or override when UNPUBLISHED is set.
 *
 * @param {DatoRecord} item
 * @returns {DatoRecord}
 */
function filterPublished (item) {
  if (includeUnpublished) {
    return true;
  }
  return true; // return item.published eventually
}

/**
 * Get 'parent' of child when no tree structure is defined
 *
 * @param {Dato} dato
 * @param {DatoRecord} child
 * @returns {DatoRecord|undefined} record or undefined
 */
function getParent (dato, child) {
  const childType = child.itemType.apiKey; // get machine-readable entity name
  let parentType;
  switch (childType) {
    case 'page':
      parentType = 'chapter';
      break;
    case 'chapter':
      parentType = 'book';
  }

  const parents = dato[`${parentType}s`].filter(parent => parent[`${childType}s`].some(
    childFromParent => childFromParent.id === child.id,
  ));
  return (parents) ? parents[0] : undefined;
}

/**
 * Get neighbours from array
 *
 * @param {Item} srcItem, [] array
 * @returns {previous{}, next{} }
*/
function getNeighboursFromArray (srcItem, array) {
  const index = array.findIndex(item => item.id === srcItem.id);
  return { 'previous': array[index - 1], 'next': array[index + 1] };
}

/**
 * Get highest occuring theme for array of items
 *
 * @param {object[]} items
 * @returns {linkObject[]} theme
 */
function getDominantTheme (items) {
  const themes = items
    .filter(item => item)
    .filter(item => item.theme) // strip out unset themes
    .reduce((themes, item) => {
      if (themes[item.theme.slug]) {
        themes[item.theme.slug].score++;
      } else {
        themes[item.theme.slug] = Object.assign(item.theme, { score: 0 });
      }
      return themes;
    }, {});

  return Object.values(themes).sort((a, b) => a.score < b.score)[0];
}

/**
 * Get the first image found in the pages array
 *
 * @param {object[]} pages
 */
function getChapterCover (pages) {
  const images = pages
    .filter(page => page.images)
    .map(page => page.images)
    .reduce((list, images) => [...list, ...images]);
  return images[0];
}

/**
 * Convert comma-separated string to array of linkObjects
 *
 * @param {string} tagString
 * @param {sting} tagType
 * @returns {linkObject[]}
 */
function tagStringToLinkObjects (tagString, tagType) {
  return (tagString) ? tagString.split(/,\s?/).map(string => {
    const slug = slugify(string).toLowerCase();
    return {
      title: string.toLowerCase(),
      slug: slug,
      path: `/${tagType}/${slug}`,
    };
  }) : undefined;
}
