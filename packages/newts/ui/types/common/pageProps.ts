type NextPageProps<T = never> = {
  params?: T,
  searchParams: Record<string, string | string[]>,
}

export default NextPageProps
