import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_KEY);

const index = client.initIndex(process.env.ALGOLIA_INDEX);

export default index