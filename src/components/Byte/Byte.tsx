import * as React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import { Loader } from '../Loader/Loader';

// Redux
import { connect } from 'react-redux';
import { initConsumableByte } from '../../redux-actions';

// Apollo
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


import './Byte.scss';

type Props = {
  initByte: any;
  [propName: string]: any;
}

const Byte = (props: Props) => {
  let id: string = props.match.params.id;
  let query = gql`query byte($id: String!) {
        byte(id: $id) {
          id, 
          image,
          name,
          description,
          date,
          creator {
            id,
            firstname,
            lastname
          },
          materials {
            youtubeVideo
          },
          sections {
              id,
              name,
              description,
              videoIn,
              videoOut,
              questions {
                  index,
                  text,
                  answerId,
                  options {
                      id,
                      text
                  }
              }
          },
        }
      }`;

  return (
    <Query query={query} variables={{id}}>
      {({ loading, error, data }) => {
        if (loading) return <Loader text="Loading byte..." />;
        if (error) return <p>Error :( {error}</p>;

        props.initByte(data);

        return (
          <div className="byte">
            <Sidebar />
            <Content />
          </div>
        );
      }}
    </Query>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  initByte: (data: any) => dispatch(initConsumableByte(data.byte))
});

export default connect(null, mapDispatchToProps)(Byte);
