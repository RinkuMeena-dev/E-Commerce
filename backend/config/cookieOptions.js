const isProduction = process.env.NODE_ENV === 'production'

export const cookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge
})
