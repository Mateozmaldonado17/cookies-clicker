import { css } from 'lit';

export default css`
  :host {
    display: contents;
    user-select: none;
    margin: 0;
    color: white;
  }

  @keyframes clickBounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
    }
  }

  .cookie-clicker {
    display: grid;
    place-content: center;
    user-select: none;
  }

  .cookie-clicker-img {
    cursor: pointer;
  }

  .cookie-clicker-img:active {
    animation: clickBounce 0.1s ease;
  }
`;
