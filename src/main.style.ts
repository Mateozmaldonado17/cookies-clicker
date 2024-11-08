import { css } from 'lit';

export default css`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Teko:wght@300..700&display=swap');

  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    align-self: center;
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  @keyframes dance {
    0% {
      transform: translateX(0) rotate(0deg);
    }
    20% {
      transform: translateX(-5px) rotate(-5deg);
    }
    40% {
      transform: translateX(5px) rotate(5deg);
    }
    60% {
      transform: translateY(-5px) rotate(-5deg);
    }
    80% {
      transform: translateY(5px) rotate(5deg);
    }
    100% {
      transform: translateX(0) rotate(0deg);
    }
  }

  #background-audio {
    opacity: 0;
  }

  .only-dancing-font {
    font-family: 'Dancing Script', cursive;
  }

  .dancing-font-username {
    font-family: 'Dancing Script', cursive;
    font-size: 62px;
    text-transform: capitalize;
    animation: dance 0.5s infinite alternate;
    color: #ffffff;
    text-shadow:
      #ccc 0 1px 0,
      #c9c9c9 0 2px 0,
      #bbb 0 3px 0,
      #b9b9b9 0 4px 0,
      #aaa 0 5px 0,
      rgba(0, 0, 0, 0.1) 0 6px 1px,
      rgba(0, 0, 0, 0.1) 0 0 5px,
      rgba(0, 0, 0, 0.3) 0 1px 3px,
      rgba(0, 0, 0, 0.15) 0 3px 5px,
      rgba(0, 0, 0, 0.2) 0 5px 10px,
      rgba(0, 0, 0, 0.2) 0 10px 10px,
      rgba(0, 0, 0, 0.1) 0 20px 20px;
  }

  .total-cookies {
    position: relative;
    font-family: 'Teko';
    font-optical-sizing: auto;
    color: #ffffff;
    font-size: 80px;
    text-transform: uppercase;
  }

  .cookies-value {
    position: absolute;
    font-size: 28px;
    text-transform: none;
    bottom: 0px;
    top: 70px;
    right: 0px;
    text-shadow:
      -1px -1px 0px rgba(255, 255, 255, 0.3),
      1px 1px 0px rgba(0, 0, 0, 0.8);
  }

  .factories-bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .list-factory-modal {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0px;
    font-family: 'Courier New', Courier, monospace;
    background-color: white;
    width: 100%;
    height: calc(100vh - 128px);
    z-index: 1;
  }

  .list-factory-modal-header {
    display: grid;
    flex-direction: row;
    width: 100%;
    gap: 10px;
    & .buttons {
      display: flex;
      gap: 5px;
      justify-content: center;
      & button {
        font-size: 16px;
        padding: 10px;
      }
    }
  }

  .list-factory-modal-content {
    max-height: 400px;
    overflow: scroll;
  }
`;
