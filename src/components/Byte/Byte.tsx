import * as React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import { Loader } from "../Loader/Loader";

// Redux
import { connect } from "react-redux";
import { initConsumableByte } from "@/redux-actions";

// Apollo
import { Query } from "react-apollo";
import gql from "graphql-tag";


import "./Byte.scss";

type Props = {
  initByte: any,
}

const Byte = (props: Props) => {
  let query = `query {
        byte(id: "1") {
          id, 
          name,
          description,
          date,
          creator {
            name
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
    <Query
      query={gql`
        ${query}
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loader text="Loading byte..." />;
        if (error) return <p>Error :( {error}</p>;

          console.log('DATA', data);

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
