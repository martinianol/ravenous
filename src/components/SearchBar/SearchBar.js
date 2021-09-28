import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    }
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active'
    }
    return ''
  };

  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption })
    this.search()
  };

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  };

  handleLocationChange(event) {
    this.setState({ location: event.target.value });

  };

  search() {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
  }

  handleSearch(event) {
    event.preventDefault()
    this.search()
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.search()
    }
  }


  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption]
      return <li
        className={this.getSortByClass(sortByOptionValue)}
        key={sortByOptionValue}
        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}

      >{sortByOption}
      </li>
    });
  };

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input
            onChange={this.handleTermChange}
            onKeyUp={this.handleKeyPress}
            placeholder="Search Businesses"
          />
          <input
            onChange={this.handleLocationChange}
            onKeyUp={this.handleKeyPress}
            placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Let's Go</a>
        </div>
      </div>
    )
  }
}

export default SearchBar;