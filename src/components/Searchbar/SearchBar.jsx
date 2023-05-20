// import { Component } from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdPageview  } from 'react-icons/md';
import {
  SearchHeader,
  SearchForm,
  SearchFormInput,
  SearchButton,
} from './SearchBar.styled';

export const SearchBar = ({onSubmit}) => {
  const [query, setQuery] = useState('');

const handleChange = e => {
  setQuery(e.currentTarget.value)
    // this.setState({ query: e.currentTarget.value });
  };

const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please specify your query!');
      return;
    }
    onSubmit(query);
  };

    return (
      <SearchHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <MdPageview  style={{ width: 30, height: 30 }} />
          </SearchButton>

          <SearchFormInput
            type="text"
            name="query"
            value={query}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchHeader>
    );
  }

  SearchBar.propTypes = {
    onSubmit: PropTypes.func,
  };





  

// export class SearchBar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func,
//   };

//   state = {
//     query: '',
//   };

//   handleChange = e => {
//     this.setState({ query: e.currentTarget.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.query.trim() === '') {
//       toast.error('Please specify your query!');
//       return;
//     }
//     this.props.onSubmit(this.state.query);
//     // this.reset();
//   };

//   // reset = () => {
//   //   this.setState({ query: '' });
//   // };

//   render() {
//     const { query } = this.state;

//     return (
//       <SearchHeader>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchButton type="submit">
//             <MdPageview  style={{ width: 30, height: 30 }} />
//           </SearchButton>

//           <SearchFormInput
//             type="text"
//             name="query"
//             value={query}
//             onChange={this.handleChange}
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </SearchForm>
//       </SearchHeader>
//     );
//   }
// }
