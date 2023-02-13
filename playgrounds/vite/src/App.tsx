import styled from '@emotion/styled';
import { SvgAdd } from '@itwin/itwinui-icons-react';

const App = () => {
  return (
    <>
      <InputWrapper>
        <input />
      </InputWrapper>
    </>
  );
};

const InputWrapper = styled.div`
  display: inline-flex;
  border: 1px solid;
  background: Canvas;
  color: CanvasText;
  cursor: pointer;
  position: relative;
  height: 2.5rem;
  width: 3rem;
  transition: width 0.2s;

  > input {
    all: unset;
    width: 100%;
    padding-inline: 4px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: inherit;
    pointer-events: none;
  }

  &::after {
    --search-svg: url('data:image/svg+xml,<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\
      <path d="M11 9.7c.7-1 1.1-2.2 1.1-3.5.1-3.5-2.7-6.2-6-6.2C2.7 0 0 2.7 0 6.1s2.7 6.1 6.1 6.1c1.3 0 2.5-.4 3.5-1.1l4.9 4.9 1.4-1.4zm-5 .5c-2.3 0-4.1-1.8-4.1-4.1S3.7 2 6 2s4.1 1.8 4.1 4.1-1.8 4.1-4.1 4.1"/>\
    </svg>');

    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: currentColor;
    mask: var(--search-svg) no-repeat center / contain;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
  }

  &:focus-within {
    cursor: unset;
    width: 100%;
    border-color: hotpink;

    &::before,
    &::after {
      content: unset;
    }
  }
`;

export default App;
