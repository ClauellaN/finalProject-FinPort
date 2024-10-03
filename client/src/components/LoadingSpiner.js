import styled from "styled-components";

export const Loading = () => {
  return (
    <PulseContainer>
      <PulseDot />
      <PulseDot />
      <PulseDot />
    </PulseContainer>
  );
};

const PulseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const PulseDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: purple;
  border-radius: 50%;
  animation: pulse 0.6s infinite alternate;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }
`;
