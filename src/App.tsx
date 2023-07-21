import styled from "styled-components";
import jsondata from "assets/json/leaderboard.json";
import { useEffect, useState, useRef } from "react";

const AppContainer = styled.div`
  html,
  body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }
`;

const StyledMenu = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const StyledBody = styled.div`
  max-width: 80%;
  margin: auto;
`;

const PrimaryButton = styled.div<{ full?: boolean }>`
  border-radius: 2px;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
  background: #058ad4;
  color: #f5f5f5;
  width: ${(props) => (props.full ? "100%" : "auto")};

  &:hover {
    background: #2ea3e4;
  }

  &:active {
    background: rgba(5, 138, 212, 0.4);
    color: rgba(245, 245, 245, 0.72);
  }
`;

const StyledSearchBar = styled.div`
  border-radius: 2px;
  padding: 5px 16px;
  position: relative;
  text-align: center;
  background: #f5f5f5;
  border: 1px solid #058ad4;

  &:hover {
    border-color: #2ea3e4;
  }

  &:active {
    border-color: rgba(5, 138, 212, 0.4);
  }
`;

const StyledSearchInput = styled.input`
  height: 100%;
  border: none;
  &:hover {
    border: 0px;
  }

  &:focus-visible {
    outline: none;
  }
`;
const StyledSearchIcon = styled.span`
  position: relative;
  top: 2px;
  margin-right: 5px;
`;

const StyledUserTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #ddd;
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }
`;

function App() {
  const [strSchUser, SetSchUser] = useState("");
  const [userData, setUserData] = useState([{}]);
  const inputRef: any = useRef(null);
  let searchedUser: any = [];

  useEffect(() => {
    GetUserData();
  }, []);

  const GetUserData = () => {
    let data = [];
    for (const [key, value] of Object.entries(jsondata)) {
      data.push(value);
    }
    data.sort((a: any, b: any) => b.bananas - a.bananas);
    setUserData(data);
  };

  const SearchUser = (username: string) => {
    if (username === undefined || username === " ") {
      window.alert("Must Input User Name!");
    }
    searchedUser = userData.find((obj: any) => {
      return obj.name === username;
    });
    if (searchedUser === undefined) {
      window.alert(
        "This user name does not exist! Please specify an existing user name!"
      );
    }
  };

  const searchBtnClicked = () => {
    if (inputRef.current) {
      SetSchUser(inputRef.current.value);
      SearchUser(strSchUser);
    }
  };

  const showUsers = () => {
    let w_item: any = [];
    let searchedUser: any = [];
    let elementText = [];

    if (userData.length < 10) {
      return;
    }

    for (let i = 0; i < 9; i++) {
      w_item = userData[i];
      elementText.push(
        <tr key={i}>
          {strSchUser === w_item.name ? (
            <td style={{ color: "red" }}>
              <pre>{w_item.name}</pre>
            </td>
          ) : (
            <td>
              <pre>{w_item.name}</pre>
            </td>
          )}

          <td>{i + 1}</td>
          <td>{w_item.bananas}</td>
          <td>{strSchUser === w_item.name ? "yes" : "no"}</td>
        </tr>
      );
    }

    w_item = userData[9];
    if (searchedUser && searchedUser.bananas <= w_item.bananas) {
      elementText.push(
        <tr key={10}>
          <td style={{ color: "red" }}>
            <pre>{searchedUser.name}</pre>
          </td>
          <td>{10}</td>
          <td>{searchedUser.bananas}</td>
          <td>yes</td>
        </tr>
      );
    } else {
      elementText.push(
        <tr key={10}>
          <td>
            <pre>{w_item.name}</pre>
          </td>
          <td>{10}</td>
          <td>{w_item.bananas}</td>
          <td>{strSchUser === w_item.name ? "yes" : "no"}</td>
        </tr>
      );
    }
    return <>{elementText}</>;
  };

  return (
    <AppContainer>
      <StyledMenu>
        <StyledSearchBar>
          <StyledSearchIcon>
            <svg
              width="15px"
              height="15px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              aria-hidden="true"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g stroke="#777777" strokeWidth="1.3">
                  <g>
                    <path d="M13.4044,7.0274 C13.4044,10.5494 10.5494,13.4044 7.0274,13.4044 C3.5054,13.4044 0.6504,10.5494 0.6504,7.0274 C0.6504,3.5054 3.5054,0.6504 7.0274,0.6504 C10.5494,0.6504 13.4044,3.5054 13.4044,7.0274 Z"></path>
                    <path d="M11.4913,11.4913 L17.8683,17.8683"></path>
                  </g>
                </g>
              </g>
            </svg>
          </StyledSearchIcon>
          <StyledSearchInput
            ref={inputRef}
            type="text"
            placeholder="UserName.."
            name="SchUserName"
          />
        </StyledSearchBar>
        <PrimaryButton onClick={searchBtnClicked}> Search User </PrimaryButton>
      </StyledMenu>
      <StyledBody>
        <StyledUserTable className="UserTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rank</th>
              <th>Number of bananas</th>
              <th>isSearchedUser?</th>
            </tr>
          </thead>
          <tbody>
            <>{showUsers()}</>
          </tbody>
        </StyledUserTable>
      </StyledBody>
    </AppContainer>
  );
}

export default App;
