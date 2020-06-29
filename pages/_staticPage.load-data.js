import fetchContent from '~/lib/fetch-content';
import marked from '~/lib/custom-marked';
import query from './_staticPage.graphql';

export default function({ slug }) {
  return fetchContent({ query, variables: { slug } })
    .then(({ staticPage }) => staticPage)
    .then((page = {}) => ({ ...page, body: marked(page.body) }));
}
