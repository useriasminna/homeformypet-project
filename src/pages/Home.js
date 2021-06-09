import React from "react";
// import Post from "components/Post";
// import HomeSidebar from "components/HomeSidebar";
// import { auth, db } from "utils/firebase";
import styled from "styled-components";
import HomeCover from "assets/Dogs-and-humans.jpg";
import Header from "components/common/AppHeader";
import { Button } from "antd";
import { useHistory } from "react-router";

const HomeBody = styled.body`
  background-color: #f6f6f6;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px;
  background-color: #fff;
  position: relative;
  justify-content: center;
  align-content: center;
`;
const CoverContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: inline-table;
  }
`;
// const SectionBreak = styled.hr`
//   border: 0;
//   height: 2px;
//   background-image: linear-gradient(to right, transparent, #ccc, transparent);
//   margin: 40px 0px;
// `;

const FadeCoverContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 15px;
  opacity: 0.7;
  background-color: #d7bf94;
  background-image: linear-gradient(to top right, #d7bf94, #ffffff);
  z-index: 1;
`;
const AppPurposeContainer = styled.div`
  position: absolute;
  width: 60%;
  height: 40%;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
  align-content: center;
  margin-bottom: 100px;
`;

const AppPurposeText = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 19px;
  text-align: justify;
  a:hover {
    text-decoration: underline;
  }

  h1 {
    color: #4c4632;
    text-align: center;
    font-weight: bolder;
    font-style: italic;
  }
  strong {
    color: #4c4632;
    font-style: italic;
    z-index: 11;
  }
`;
const SignUpButton = styled(Button)`
  width: 150px;
  height: 37px;
  background-color: #d6f2d1;
  border: 1px solid transparent;
  color: darkgreen;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 12px;
  margin-top: 20px;
  margin-bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  :hover {
    background-color: #96bb96;
    border: 1px solid #96bb96;
    color: white;
  }
`;
const LogInLabel = styled.div`
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  span {
    font-weight: bold;
  }
  a:hover {
    text-decoration: underline;
  }
`;
// const PostList = styled.div`
//   margin-right: 28px;
//   max-width: 614px;
//   width: 100%;
//   @media (max-width: 999px) {
//     margin-right: 0;
//   }
// `;

// const NoPostsNotice = styled.div`
//   margin-right: 28px;
//   max-width: 614px;
//   width: 100%;
//   border: 1px solid lightgray;
//   text-align: center;
//   padding: 16px;
//   font-weight: 600;
//   border-radius: 4px;
//   margin-bottom: 40px;
// `;

function Home() {
  const history = useHistory();
  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };
  // const [posts, setPosts] = useState([]);
  // const [noFollowing, setNoFollowing] = useState(false);

  // useEffect(() => {
  //   db.collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       db.collection("follows")
  //         .get()
  //         .then((data) => {
  //           const following = data.docs
  //             .filter((doc) => doc.data().follower === auth.currentUser.uid)
  //             .map((doc) => doc.data().following);
  //           if (following.length > 0) {
  //             setNoFollowing(false);
  //             setPosts(
  //               snapshot.docs
  //                 .filter(
  //                   (doc) =>
  //                     following.includes(doc.data().userid) ||
  //                     doc.data().userid === auth.currentUser.uid
  //                 )
  //                 .map((doc) => ({ id: doc.id, ...doc.data() }))
  //             );
  //           } else {
  //             setNoFollowing(true);
  //             setPosts(
  //               snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //             );
  //           }
  //         });
  //     });
  // }, []);

  return (
    <HomeBody>
      <Header />
      <HomeContainer>
        <CoverContainer>
          <img src={HomeCover} alt="animals cover" />
        </CoverContainer>
        <FadeCoverContainer />
        <AppPurposeContainer>
          <AppPurposeText>
            <h1>About us</h1>
            <p>
              <strong>HomeForMyPet </strong>
              <strong>
                {" "}
                is a web app especialy designed to help building a comunity of
                pet lovers who are willing to help each other.
                <br />
                For all pet owners who are looking for a temporary home for
                their little friend, in a safe environment full of love, and for
                those who are willing to help by hosting a pet, sharing the love
                for animals , this is the right place to be.
                <br />
                Either you&apos;re looking for a pet sitter, or want to help
                other pet owners, please register to our website.
              </strong>
            </p>
          </AppPurposeText>
          <SignUpButton
            type="default"
            shape="round"
            onClick={(e) => navigateToPage(e, "/signup")}
          >
            Sign Up
          </SignUpButton>
          <LogInLabel>
            <span>
              Already have an account?{" "}
              <a href="/login" onClick={(e) => navigateToPage(e, "/login")}>
                <strong>Log In</strong>
              </a>
            </span>
          </LogInLabel>
        </AppPurposeContainer>
        {/* <SectionBreak />
        <PostList>
          {noFollowing ? (
            <NoPostsNotice>
              You aren&apos;t following anyone.
              <br />
              We&apos;ll show you posts from all the users instead.
            </NoPostsNotice>
          ) : null}
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </PostList>
        <HomeSidebar /> */}
      </HomeContainer>
    </HomeBody>
  );
}

export default Home;
