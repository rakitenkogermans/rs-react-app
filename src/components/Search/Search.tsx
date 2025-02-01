import { ChangeEvent, Component } from 'react';
import styles from './Search.module.css';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorage/localStorage.ts';

interface SearchProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

interface SearchState {
  query: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { query: this.props.initialQuery };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const { query } = this.state;
    const trimmedSearchQuery = query.trim();
    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY, trimmedSearchQuery);
    this.props.onSearch(trimmedSearchQuery);
  };

  render() {
    return (
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search vehicles..."
          value={this.state.query}
          onChange={this.handleChange}
          className={styles.searchInput}
        />
        <button onClick={this.handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
    );
  }
}

export { Search };
