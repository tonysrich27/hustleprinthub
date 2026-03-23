import { useParams, Navigate } from 'react-router-dom';
import { getCategoryBySlug } from '../data/categoryPages';
import { CategoryPageLayout } from '../components/category/CategoryPageLayout';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  if (!category) {
    return <Navigate to="/" replace />;
  }

  return <CategoryPageLayout category={category} />;
}
