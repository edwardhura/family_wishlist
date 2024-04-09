import { router } from 'router'

export const navigate = async (path: string) => {
  await router.navigate(path)
}
