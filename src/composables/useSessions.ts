import { useQuery } from '@tanstack/vue-query'
import { fetchSessions } from '@/api/sessions'
import { computed, toValue, type Ref } from 'vue'
import type { GetSessionsOptions } from '@/api/sessions'

export const useFetchSessions = (options: Ref<GetSessionsOptions>) =>
  useQuery({
    // simulate error is not being included in the queryKey
    // therefore the query will not re-run when simulate error is checked or unchecked
    queryKey: computed(() => ['sessions', toValue(options).sortOrder, toValue(options).searchText]),
    queryFn: () => fetchSessions(toValue(options)),
    // we don't want retries in this app as we want to simulate an error
    // having retries can be useful in a real app to help mitigate intermittent issues
    retry: 0,
  })
