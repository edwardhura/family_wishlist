import { router } from 'router'

export const navigate = async (path: string): Promise<void> => {
  await router.navigate(path)
}
