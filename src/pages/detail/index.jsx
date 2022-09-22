import React, { useState, useEffect } from "react";
import { NavigationStateContext } from "../../App";
import { useParams } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";
// import { HiStar } from "react-icons/hi";
import SideNavbar from "../../components/navigation/sideNav";
import TopNavbar from "../../components/navigation/topNav";
import Footer from "../../components/footer";
import axios from "axios";

import "./style.scss";
import ModalRating from "./modalRating";
import ListDetail from "./listDetail";

const RecipeDetail = (props) => {
  const [showSideNavbar, setShowSideNavbar] = useState(false);
  const [recipeData, setRecipeData] = useState({});
  // const [ratingText, setRatingText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { id, name } = useParams();

  const timeFormater = (value) => {
    const hour = Math.floor(value / 3600);
    const minutes = Math.floor((value - hour * 3600) / 60);
    const seconds = value - hour * 3600 - minutes * 60;

    return `${hour}h ${minutes}m ${seconds}s`;
  };

  const fetchRecipe = async (isLoadingRequire) => {
    if (isLoadingRequire) {
      setIsLoading(true);
    }

    try {
      await axios
        .get(props.apiUrl.getRecipeById + id)
        .then((res) => {
          setRecipeData(res.data);

          if (isLoadingRequire) {
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchRatingByUser = async () => {
  //   const token = localStorage.getItem("access_token");
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     await axios
  //       .get(props.apiUrl.getRatingByUser + id, config)
  //       .then((res) => {
  //         setUserRating(res.data.rating);
  //         switch (res.data.rating) {
  //           case 1:
  //             setRatingText("I hate it 😠");
  //             break;
  //           case 2:
  //             setRatingText("I don't like it 😒");
  //             break;
  //           case 3:
  //             setRatingText("It is awesome 😄");
  //             break;
  //           case 4:
  //             setRatingText("I like it 😎");
  //             break;
  //           case 5:
  //             setRatingText("I love it 😍");
  //             break;
  //           default:
  //             setRatingText("");
  //         }
  //       })
  //       .catch((err) => {
  //         if (
  //           err.response.status === 401 &&
  //           err.response.data.message === "Token expired."
  //         ) {
  //           localStorage.removeItem("access_token");
  //           window.location.reload();
  //         }

  //         console.error(err);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const createUpdateReting = async (rate) => {
  //   const token = localStorage.getItem("access_token");
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   const bodyParam = {
  //     rating: rate,
  //   };

  //   try {
  //     await axios
  //       .post(props.apiUrl.createUpdateRating + id, bodyParam, config)
  //       .then((res) => {
  //         fetchRecipe(false);
  //         // fetchRatingByUser();
  //       })
  //       .catch((err) => {
  //         if (
  //           err.response.status === 401 &&
  //           err.response.data.message === "Token expired."
  //         ) {
  //           localStorage.removeItem("access_token");
  //           window.location.reload();
  //         }

  //         alert("Failed to rate this recipe");
  //         console.error(err);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleRating = (e, text, value) => {
  //   if (e.target.value === "on") {
  //     setRatingText(text);
  //     createUpdateReting(value);
  //   }
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRecipe(true);

    // if (localStorage.getItem("access_token")) {
    //   fetchRatingByUser();
    // }
  }, []);

  useEffect(() => {
    document.title = name;
  }, []);

  return (
    <>
      <div className="recipe-detail-container">
        <NavigationStateContext.Provider
          value={[showSideNavbar, setShowSideNavbar, props.apiUrl]}
        >
          <SideNavbar setCurrentPage={props.setCurrentPage} />
          <TopNavbar setCurrentPage={props.setCurrentPage} />
        </NavigationStateContext.Provider>

        <div className="page-container">
          <div className="page-content">
            <div className="content-body">
              <div className="card-content">
                <div className="card-header">
                  {isLoading ? (
                    <div className="skeleton-img-container"></div>
                  ) : (
                    <div className="img-container">
                      <img src={recipeData.image_url} alt="" />
                    </div>
                  )}

                  <div className="name-container">
                    {isLoading ? (
                      <>
                        <div className="skeleton-title"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                      </>
                    ) : (
                      <>
                        <h1>{recipeData.name}</h1>
                        <p>Category: {recipeData.category}</p>
                        <p>Cooked by: {recipeData.username}</p>
                        <p>Calories: {recipeData.calories}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="card-body">
                  {isLoading ? (
                    <>
                      <div className="skeleton-list-item"></div>
                      <div className="skeleton-list-item"></div>
                      <div className="skeleton-list-item"></div>
                    </>
                  ) : (
                    <>
                      <ListDetail
                        name={"About the recipe"}
                        data={[recipeData.description]}
                      />
                      <ListDetail
                        name={"Ingredients"}
                        data={recipeData.ingredients}
                      />
                      <ListDetail name={"Steps"} data={recipeData.steps} />
                    </>
                  )}
                </div>

                {/* <div className="card-footer">
                  <h2>Enjoying this recipe?</h2>

                  <div className="rating-widget">
                    <input
                      type="radio"
                      name="rate"
                      id="rate-5"
                      onChange={(e) => handleRating(e, "I love it 😍", 5)}
                      disabled={!localStorage.getItem("access_token")}
                      checked={userRating === 5}
                    />
                    {localStorage.getItem("access_token") ? (
                      <label className="enable-star" htmlFor="rate-5">
                        <HiStar size={28} />
                      </label>
                    ) : (
                      <label
                        className="disable-star"
                        htmlFor="rate-5"
                        onClick={() => setModalVisible(true)}
                      >
                        <HiStar size={28} />
                      </label>
                    )}

                    <input
                      type="radio"
                      name="rate"
                      id="rate-4"
                      onChange={(e) => handleRating(e, "I like it 😎", 4)}
                      disabled={!localStorage.getItem("access_token")}
                      checked={userRating === 4}
                    />
                    {localStorage.getItem("access_token") ? (
                      <label className="enable-star" htmlFor="rate-4">
                        <HiStar size={28} />
                      </label>
                    ) : (
                      <label
                        className="disable-star"
                        htmlFor="rate-4"
                        onClick={() => setModalVisible(true)}
                      >
                        <HiStar size={28} />
                      </label>
                    )}

                    <input
                      type="radio"
                      name="rate"
                      id="rate-3"
                      onChange={(e) => handleRating(e, "It is awesome 😄", 3)}
                      disabled={!localStorage.getItem("access_token")}
                      checked={userRating === 3}
                    />
                    {localStorage.getItem("access_token") ? (
                      <label className="enable-star" htmlFor="rate-3">
                        <HiStar size={28} />
                      </label>
                    ) : (
                      <label
                        className="disable-star"
                        htmlFor="rate-3"
                        onClick={() => setModalVisible(true)}
                      >
                        <HiStar size={28} />
                      </label>
                    )}

                    <input
                      type="radio"
                      name="rate"
                      id="rate-2"
                      onChange={(e) => handleRating(e, "I don't like it 😒", 2)}
                      disabled={!localStorage.getItem("access_token")}
                      checked={userRating === 2}
                    />
                    {localStorage.getItem("access_token") ? (
                      <label className="enable-star" htmlFor="rate-2">
                        <HiStar size={28} />
                      </label>
                    ) : (
                      <label
                        className="disable-star"
                        htmlFor="rate-2"
                        onClick={() => setModalVisible(true)}
                      >
                        <HiStar size={28} />
                      </label>
                    )}

                    <input
                      type="radio"
                      name="rate"
                      id="rate-1"
                      onChange={(e) => handleRating(e, "I hate it 😠", 1)}
                      disabled={!localStorage.getItem("access_token")}
                      checked={userRating === 1}
                    />
                    {localStorage.getItem("access_token") ? (
                      <label className="enable-star" htmlFor="rate-1">
                        <HiStar size={28} />
                      </label>
                    ) : (
                      <label
                        className="disable-star"
                        htmlFor="rate-1"
                        onClick={() => setModalVisible(true)}
                      >
                        <HiStar size={28} />
                      </label>
                    )}
                  </div>

                  <p className="rating-text">{ratingText}</p>
                </div> */}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ModalRating visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default RecipeDetail;
