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
        /** Aybjax start */
        const idTokens = document.cookie.split('; ').find(c => c.includes('idToken'))?.split('=')
        const accessTokens = document.cookie.split('; ').find(c => c.includes('token'))?.split('=')
        //@ts-ignore
        const idToken = idTokens ? `Bearer ${idTokens[1]}` : null;
        const accessToken = accessTokens ? `Bearer ${accessTokens[1]}` : null;
        /** Aybjax end */
        const url = typeof params === 'string' ? params : params.url
        const response = await fetch(url, {
            method: typeof params === 'string' ? 'GET' : params.method,
            mode: 'cors',
            //@ts-ignore
            headers:
                typeof params !== 'string' && isDefined(params.body)
                    ? {
                          'Content-Type': 'application/json',
                          'X-API-KEY': idToken,
                          'Authorization': accessToken
                      }
                    : {
                        'X-API-KEY': idToken,
                        'Authorization': accessToken
                    },  
            body: typeof params !== 'string' && isDefined(params.body) ? JSON.stringify(params.body) : undefined
        })
        let data: any
        const contentType = response.headers.get('Content-Type')
        if (contentType && contentType.includes('application/json')) {
            data = await response.json()
        } else {
            data = await response.text()
        }
        if (!response.ok) {
            
            let errorMessage

            if (typeof data === 'object' && 'error' in data) {
                errorMessage = data.error
            } else {
                errorMessage = data || response.statusText
            }

            throw errorMessage
        }
        return { data }
    } catch (e) {
        console.error(e)
        return { error: e as Error }
    }
}
