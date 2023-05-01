import React from 'react'

interface LoadingProps {
    id: string
    size: number
    color?: string
}

export const Loading = (props: LoadingProps) => {
    const { id, size, color } = props
    const containerStyle: React.CSSProperties = {
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const spinnerStyle: React.CSSProperties = {
        width: size * 0.6,
        height: size * 0.6,
        border: `${size / 10}px solid #${color}`,
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    }

    const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `

    return (
        <div style={containerStyle} id={id}>
            <style>{keyframes}</style>
            <div style={spinnerStyle} />
        </div>
    )
}
