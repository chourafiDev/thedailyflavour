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
  query GetRecipesByCategory($slug: String!) {
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
