import data from './sessions.json' // representing data from the server

type Session = {
  id: string
  title: string
  tags: string[]
  mins: number
  difficulty: 'beginner' | 'intermediate' | 'advanced' | null
  popularity: number
  completed: boolean
}

export type SortOrder = 'ascending' | 'descending'

export type GetSessionsOptions = {
  searchText?: string
  sortOrder: SortOrder
  simulateError?: boolean
}

function compareSessions(sessionA: Session, sessionB: Session) {
  if (sessionA.popularity === sessionB.popularity) {
    return sessionA.title.toLocaleLowerCase().localeCompare(sessionB.title.toLocaleLowerCase())
  }
  return sessionA.popularity - sessionB.popularity
}

function getSessions({ searchText, sortOrder, simulateError }: GetSessionsOptions): Session[] {
  // the original data had mins as a string, this is being converted here
  // this is to transform the data to be have improved types for the web app
  const allSessions = data.map<Session>(
    (item) =>
      ({
        ...item,
        mins: Number(item.mins),
      }) as Session,
  )
  const sortedSessions = allSessions.sort((sessionA, sessionB) =>
    sortOrder === 'ascending'
      ? compareSessions(sessionA, sessionB)
      : compareSessions(sessionB, sessionA),
  )
  if (searchText?.trim()) {
    return sortedSessions.filter((session) =>
      session.title.toLowerCase().includes(searchText.toLowerCase()),
    )
  }
  return sortedSessions
}

export function fetchSessions(options: GetSessionsOptions): Promise<Session[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // This would not be here for a real application
      if (options.simulateError) {
        reject(new Error('You do not have permissions to view the sessions'))
      }
      resolve(getSessions(options))
    }, 500)
  })
}
