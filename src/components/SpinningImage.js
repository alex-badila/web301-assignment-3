import styled from 'styled-components';

// Create a spinning image animation
const SpinningImage = styled.div`
    animation: rotation 2s infinite linear;

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
   } 
`;

export default SpinningImage;