import React from "react";
import "./SearchPage.css";
import { useStateValue } from "../StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import Response from "../pages/response";
import { Link } from "react-router-dom";
import Search from "./Search";
import SearchIcon from "@material-ui/icons/Search";
import { Description, LocalOffer, MoreVert, Room } from "@material-ui/icons";
import ImageIcon from "@material-ui/icons/Image";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();

  //Live Api
  const {data} = useGoogleSearch(term);

  //Mock Api call
  //const data = Response;

  //console.log(data);
  return (
    <div className="searchPage">
      <div className="searchPage_header">
        <Link to="/">
          <img
            className="searchPage_logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt=""
          />
        </Link>
        <div className="searchPage_headerBody">
          <Search hideButtons />
          <div className="searchPage_Options">
            <div className="searchPage_optionsLeft">
              <div className="searchPage_option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage_option">
                <Description />
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage_option">
                <ImageIcon />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage_option">
                <LocalOffer />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="searchPage_option">
                <Room />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage_option">
                <MoreVert />
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="searchPage_optionsRight">
              <div className="searchPage_option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="searchPage_option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {term && (
        <div className="searchPage_results">
          <p className="searchPAge_resultCount">
            About {data?.searchInformation.formattedTotalResults} results
            {data?.searchInformation.formattedSearchTime} seconds for {term}
          </p>
          {data?.items.map((item) => (
            <div className="searchPage_result">
              <a className="searchPage_resultLink" href={item.link}>
                  {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                      <img className="searchPage_resultImage" src={item.pagemap?.cse_image[0]?.src} />
                  )}
                

                  {item.displayLink}</a>
              <a className="searchPage_resultTitle" href={item.link}>
                <h2>{item.title}</h2>
              </a>
              <p
              className="searchPage_resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
