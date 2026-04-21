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
        recipeDetails {
          prepTime
          cookTime
          servings
          cuisine
          difficulty
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
      content
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
        servings
        calories
        cuisine
        difficulty
        ingredients
        instructions
      }
    }
  }
`;

// Fetch all categories with post count
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

// Fetch all recipes belonging to a specific category
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
            servings
            cuisine
            difficulty
          }
        }
      }
    }
  }
`;
