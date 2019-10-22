
import { createGlobalStyle } from 'styled-components';


export default createGlobalStyle`
    * {
    margin-left: 5px;
    margin-right: 5px;
    padding: 10;
    outline: 0;
    box-sizing: border-box;
    }

    html, body, #root {
        min-height: 100%;
    }
    body {
        font-family: Georgia, 'Times New Roman', Times, serif;
        background: #fff url('../../assets/images/thumb-1920-151409.jpg') no-repeat;
        color: #333333;
        -webkit-font-smoothing: antialiased !important;
        background-size: cover;

    }
    body, input, button {
        color: #997157;
        font-size: 14px;
        font-family: Georgia, 'Times New Roman', Times, serif;
    }
    button {
        cursor: pointer;
    }

`;