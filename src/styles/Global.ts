import { css } from '@linaria/core';

export const globals = css`
  :global() {
    *,
    *::after,
    *::before {
      padding: 0;
      margin: 0;
      outline: 0;
      box-sizing: border-box;
      font-family: 'Jost', sans-serif;
    }

    #root {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    :root,
    html[data-theme='light'] {
      color-scheme: light;
      --primary: #f89200;
      --secondary: #f6f8fa;

      --text: #000;
      --header_text: #fff;

      --warning_header_bg: #1b1c1d;
      --warning_header_text: #fff;

      --scrollbar_bg: #f6f8fa;
      --scrollbar_thumb: #f89200;

      --mvpCard_id: #421411;
      --mvpCard_name: #f89200;
      --mvpCard_bg: #fff;
      --mvpCard_text: #421411;
      --mvpCard_killButton: #d10000;
      --mvpCard_editButton: #f89200;

      --mvpCard_controls_showMap: #00a8ff;
      --mvpCard_controls_edit: #f89200;
      --mvpCard_controls_delete: #d10000;

      --timers_passed: #d10000;
      --timers_normal: #421411;
      --timers_respawning: #62831f;

      --switch_bg: #ffa800;
      --switch_handle: #f6f8fa;

      --modal_bg: #fff;
      --modal_text: #421411;
      --modal_hl: #1b1c1d;
      --modal_name: #ffa800;
      --modal_time: #ffa800;
      --modal_button: #f89200;

      --modal_datePicker_border: #000;

      --modal_serverSelect_bg: #f6f8fa;
      --modal_serverSelect_bgActive: #f89200;
      --modal_serverSelect_text: #000;
      --modal_serverSelect_textActive: #fff;
      --modal_serverSelect_border: #f89200;

      --modal_changeMap_border: #00a8ff;
      --modal_changeMap_text: #000;
      --modal_changeMap_selectedMapBorder: #ffa800;

      --filterSearch_bg: #fff;
      --filterSearch_border: #f89200;
      --filterSearch_text: #000;
      --filterSearch_border_focus: #000;

      --languagePicker_bg: #f6f8fa;
      --languagePicker_border: #f89200;
      --languagePicker_text: #421411;

      --footer_text: #000;
      --footer_link: #53338d;

      --pulse_color: #e5e5e5;

      color: var(--text);
    }

    html[data-theme='dark'] {
      color-scheme: dark;
      --primary: #1b1c1d;
      --secondary: #0e0e11;

      --text: #ffffff;
      --header_text: #ffffff;

      --warning_header_bg: #f89200;
      --warning_header_text: #000000;

      --scrollbar_bg: #121215;
      --scrollbar_thumb: #f89200;

      --mvpCard_id: rgba(255, 255, 255, 0.55);
      --mvpCard_name: #ffa800;
      --mvpCard_bg: rgba(26, 26, 33, 0.8);
      --mvpCard_text: #ffffff;
      --mvpCard_killButton: linear-gradient(135deg, #e62e00 0%, #a80000 100%);
      --mvpCard_editButton: linear-gradient(135deg, #f89200 0%, #c47300 100%);
      --mvpCard_controls_showMap: #00a8ff;
      --mvpCard_controls_edit: #f89200;
      --mvpCard_controls_delete: #d10000;

      --timers_passed: #ff4d4d;
      --timers_normal: #ffffff;
      --timers_respawning: #76bc21;

      --switch_bg: #f89200;
      --switch_handle: #000000;

      --modal_bg: #1a1a22;
      --modal_text: #ffffff;
      --modal_hl: #ffffff;
      --modal_name: #ffa800;
      --modal_time: #ffa800;
      --modal_button: #f89200;

      --modal_datePicker_border: #ffffff;

      --modal_serverSelect_bg: #2a2a35;
      --modal_serverSelect_bgActive: #f89200;
      --modal_serverSelect_text: #ffffff;
      --modal_serverSelect_textActive: #ffffff;
      --modal_serverSelect_border: transparent;

      --modal_changeMap_border: #00a8ff;
      --modal_changeMap_text: #ffffff;
      --modal_changeMap_selectedMapBorder: #ffa800;

      --filterSearch_bg: rgba(26, 26, 33, 0.85);
      --filterSearch_border: rgba(255, 255, 255, 0.12);
      --filterSearch_text: #ffffff;
      --filterSearch_border_focus: #f89200;

      --languagePicker_bg: #2a2a35;
      --languagePicker_border: rgba(255, 255, 255, 0.12);
      --languagePicker_text: #ffffff;

      --footer_text: #a0a0ab;
      --footer_link: #ffa800;

      --pulse_color: #353542;

      color: var(--text);
    }

    html {
      font-size: 62.5%;
    }

    body,
    button,
    input,
    textarea {
      font-size: 1.6rem;
    }

    a {
      text-decoration: none;
    }

    button,
    input {
      border: 0;
    }

    button {
      cursor: pointer;
    }

    *:not(body, html)::-webkit-scrollbar-track {
      background-color: var(--scrollbar_bg);
    }

    *:not(body, html)::-webkit-scrollbar {
      width: 1.6rem;

      @media (max-width: ${1000 / 16}em) {
        width: 1.2rem;
      }
    }

    *:not(body, html)::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border: 4px solid transparent;
      background-clip: content-box;
      background-color: var(--scrollbar_thumb);

      @media (max-width: ${1000 / 16}em) {
        border-radius: 10px;
      }
    }
  }
`;
