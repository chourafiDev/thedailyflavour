import { gql } from "graphql-request";

export const GET_ALL_RECIPES = gql`
  query GetAllRecipes {
    posts(first: 100) {
      nodes {
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            slug
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        recipeDetails {
          prepTime
          cookTime
          totalTime
          calories
          cost
        }
      }
    }
  }
`;

export const GET_RECIPE_BY_SLUG = gql`
  query GetRecipeBySlug($slug: String!) {
    postBy(slug: $slug) {
      title
      slug
      date
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      recipeDetails {
        prepTime
        cookTime
        totalTime
        servings
        calories
        cost
        ingredients
        instructions
        notes
        nutrition
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories(first: 50) {
      nodes {
        id
        name
        slug
        description
        count
      }
    }
  }
`;

export const GET_RECIPES_BY_CATEGORY = gql`
  query GetRecipesByCategory($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      posts(first: 100) {
        nodes {
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_CATEGORY_WITH_POSTS = gql`
  query GetCategoryWithPosts($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      name
      description
      slug
      posts(first: 100) {
        nodes {
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          author {
            node {
              name
              slug
            }
          }
          recipeDetails {
            prepTime
            cookTime
            totalTime
            calories
          }
        }
      }
    }
  }
`;

export const GET_AUTHOR_BY_SLUG = gql`
  query GetAuthorBySlug($slug: ID!) {
    user(id: $slug, idType: SLUG) {
      name
      slug
      description
      avatar(size: 300) {
            url
      }
      posts(first: 100) {
        nodes {
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          recipeDetails {
            prepTime
            cookTime
            totalTime
            calories
          }
        }
      }
    }
  }
`;

export const GET_ALL_AUTHORS = gql`
  query GetAllAuthors {
    users(first: 50, where: { hasPublishedPosts: POST }) {
      nodes {
        name
        slug
        description
        avatar {
          url
        }
      }
    }
  }
`;
