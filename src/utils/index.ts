export const isNotDefined = <T>(value: T | undefined | null): value is undefined | null => value === undefined || value === null

export const isDefined = <T>(value: T | undefined | null): value is NonNullable<T> => value !== undefined && value !== null

export const isEmpty = (value: string | undefined | null): value is undefined => value === undefined || value === null || value === ''

export const isNotEmpty = (value: string | undefined | null): value is string => value !== undefined && value !== null && value !== ''

export const sendRequest = async <ResponseData>(
    params:
        | {
              url: string
              method: string
              body?: Record<string, unknown> | FormData
          }
        | string
): Promise<{ data?: ResponseData; error?: Error }> => {
    try {
        console.log(111,'trying to fetch')
        const url = typeof params === 'string' ? params : params.url
        const response = await fetch(url, {
            method: typeof params === 'string' ? 'GET' : params.method,
            mode: 'cors',
            headers:
                typeof params !== 'string' && isDefined(params.body)
                    ? {
                          'Content-Type': 'application/json'
                      }
                    : undefined,
            body: typeof params !== 'string' && isDefined(params.body) ? JSON.stringify(params.body) : undefined
        })
        let data: any
        const contentType = response.headers.get('Content-Type')
        if (contentType && contentType.includes('application/json')) {
            data = await response.json()
        console.log(112,{data})

        } else {
        console.log(113,{data})

            data = await response.text()
        }
        if (!response.ok) {
            
            let errorMessage

            if (typeof data === 'object' && 'error' in data) {
                errorMessage = data.error
            } else {
                errorMessage = data || response.statusText
            }

        console.log(114,{errorMessage})

            throw errorMessage
        }
        console.log(111,{data})

        return { data }
    } catch (e) {
        console.log(111,'failed to fetch')

        console.error(e)
        return { error: e as Error }
    }
}
