import { css } from 'lit';

export default css`
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
