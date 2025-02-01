import { ChangeEvent, Component } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (query: string) => void;
}

interface SearchState {
  query: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { query: '' };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.query);
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
