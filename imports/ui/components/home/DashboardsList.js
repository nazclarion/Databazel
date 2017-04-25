import React from 'react';
import i18n from 'meteor/universe:i18n';
import { gql, graphql, compose } from 'react-apollo';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { CardText, Card } from 'material-ui/Card';
import { grey400 } from 'material-ui/styles/colors';

import DashboardListItem from './DashboardsListItem.js';

const styles = {
  card: {
    container: {
      width: '100%',
      height: '75%',
    },
  },
  newDashboard: {
    plus: {
      root: {
        display: 'block',
        margin: 'auto',
        marginBottom: '16%',
        width: '40%',
        height: '40%',
        cursor: 'pointer',
      },
    },
  },
  dashboardName: {
    container: {
      root: {
        position: 'absolute',
        width: '98%',
        marginTop: '-90px',
      },
    },
    input: {
      root: {
        fontSize: '1.3em',
      },
    },
  },
};

class DashboardsList extends React.Component {
  constructor() {
    super();
    this.submitCreateDashboard = this.submitCreateDashboard.bind(this);
    this.handlePlusIconTouched = this.handlePlusIconTouched.bind(this);
  }
  handlePlusIconTouched() {
    const { form, dashboardName } = this.refs;
    if (dashboardName.getValue() === '') {
      dashboardName.focus();
    } else {
      form.submit();
    }
  }

  submitCreateDashboard(model) {
    const { submitDashboard } = this.props;
    const { dashboardName } = this.refs;

    submitDashboard(dashboardName.getValue())
      .then(res => {
        if (!res.errors) {
          const { submitDashboard: { id: _id } } = res.data;
          // redirect
          window.location.pathname = `/dashboard/${_id}`;
        } else {
          // error handling
          console.log({ errors: res.errors });
        }
      });
  }

  render() {
    const { dashboards, isLoading, submitDashboard, context } = this.props;
    return (
      <div className="dashboard-cards row">
        {dashboards && dashboards.map(dashboard => (
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
            key={dashboard.id}
          >
            <DashboardListItem
              context={context}
              dashboard={dashboard}
            />
          </div>
        ))}
        {isLoading ? null :
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <Card style={styles.card.container}>
              <ContentAdd
                style={styles.newDashboard.plus.root}
                color={grey400}
                onTouchTap={this.handlePlusIconTouched}
              />
              <CardText style={styles.dashboardName.container.root}>
                <Formsy.Form onValidSubmit={this.submitCreateDashboard} ref="form">
                  <FormsyText
                    name="dashboardName"
                    fullWidth
                    floatingLabelText={i18n.__('type_name_of_new_dashboard')}
                    style={styles.dashboardName.input.root}
                    required
                    className="newDashboardName"
                    ref="dashboardName"
                  />
                </Formsy.Form>
              </CardText>
            </Card>
          </div>
        }
      </div>
    );
  }
}

const DASHBOADRS_QUERY = gql`
  query Dashboards {
    dashboards {
      id
      name
      users {
        id
        createdAt
        emails {
          address
          verified
        }
      }
    }
  }
`;

const SUBMIT_DASHBOARD_MUTATION = gql`
  mutation SubmitDashboard($name: String!) {
    submitDashboard(name: $name) {
      id
      name
      users {
        id
        createdAt
        emails {
          address
          verified
        }
      }
    }
  }
`;

const withDashboardQuery = graphql(DASHBOADRS_QUERY, {
  props: ({ data: { loading, dashboards } }) => ({
    isLoading: loading,
    dashboards,
  }),
});

const withSubmitDashboardMutation = graphql(SUBMIT_DASHBOARD_MUTATION, {
  name: 'submitDashboardMutation',
  props: ({ submitDashboardMutation }) => ({
    submitDashboard: name => submitDashboardMutation({
      variables: { name },
      updateQueries: {
        Dashboards: ( prevData, { mutationResult }) => ({
          ...prevData,
          dashboards: [...prevData.dashboards, mutationResult.data.submitDashboard],
        }),
      },
    }),
  }),
});

export default compose(
  withDashboardQuery,
  withSubmitDashboardMutation,
)(DashboardsList);
