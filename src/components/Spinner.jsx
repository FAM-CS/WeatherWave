import styled from '@emotion/styled'

//? REF: Spinner from https://tobiasahlin.com/spinkit/.

const SpinnerAnimation = styled.div`
    & {
        /* margin: 100px auto;
        width: 50px;
        height: 40px; */
        width: 200px;
        height: 80px;
        text-align: center;
        font-size: 10px;
    }

    & > div {
        background-color: ${({theme}) => theme.colors.accent};
        height: 100%;
        width: 6px;
        margin-right: 10px;
        display: inline-block;

        -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
        animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }

    & .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }

    & .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    & .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    & .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }

    @-webkit-keyframes sk-stretchdelay {
        0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
        20% { -webkit-transform: scaleY(1.0) }
    }

    @keyframes sk-stretchdelay {
        0%, 40%, 100% {
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
        }  20% {
            transform: scaleY(1.0);
            -webkit-transform: scaleY(1.0);
        }
    }
`


export default function Spinner() {
    return (
        <SpinnerAnimation className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </SpinnerAnimation>
    )
}
