import React, { useState }from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Global, css, ThemeProvider } from '@emotion/react'
import ThemeToggleContext from './contexts/ThemeToggleContext'

import { dayTheme, nightTheme } from './themes/theme'
import App from './App'


//? I referenced below to update the theme from any context of the site
//? REF: https://www.topcoder.com/thrive/articles/implementing-dark-mode-in-next-js-with-emotion


const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    }
])


function Main() {
    const [isDayTheme, toggleTheme] = useState(true)
    const currentTheme = isDayTheme ? dayTheme : nightTheme
    const [isMounted, setIsMounted] = React.useState(false)


    //? Initialize context once on mount
    React.useEffect(() => {
        setIsMounted(true);
    }, [])

    const globalStyles = css`
        @import url('https://fonts.googleapis.com/css2?family=Mohave:ital,wght@0,300..700;1,300..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
        html {
            font-family: "Roboto", sans-serif;
        }
        body {
            margin: 0;
            background-color: ${currentTheme.colors.background};
        }
        main {
            margin: 20px 20px;
        }
    `
    return (
        <React.StrictMode>
            <Global styles={globalStyles} />
            <ThemeProvider theme={currentTheme}>
                {isMounted && (
                    <ThemeToggleContext.Provider
                        value={{
                            isDayTheme: isDayTheme,
                            toggleTheme: toggleTheme,
                        }}
                    >
                        <QueryClientProvider client={queryClient}>
                            <RouterProvider router={router} />
                        </QueryClientProvider>
                    </ThemeToggleContext.Provider>
                )}
            </ThemeProvider>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Main />
)
