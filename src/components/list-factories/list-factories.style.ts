import { css } from 'lit';

export default css`
  :host {
    display: contents;
    user-select: none;
    margin: 0;
    color: black;
    width: 100%;
  }

  .list-factories {
    background-color: red;
    display: flex;
    font-family: 'Courier New', Courier, monospace;
    flex-direction: row;
    overflow-y: scroll;
    scroll-behavior: smooth;
    justify-content: center;
    gap: 15px;
    background-color: white;
    padding-block: 5px;
    width: 100%;
    & div {
      opacity: 0.8;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  .factory-img {
    background-size: cover;
    background-position: center;
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
`;
