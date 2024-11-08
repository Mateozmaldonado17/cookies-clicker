import { css } from 'lit';

export default css`
  :host {
    display: contents;
    user-select: none;
    margin: 0;
    color: white;
  }

  .create-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }

  .create-user input {
    width: 150px;
    font-size: 14px;
    border: 0px solid;
    padding: 10px;
  }

  .create-user button {
    margin-top: 5px;
    width: 170px;
    font-size: 14px;
    border: 0px solid;
    padding: 10px;
  }
`;
