import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import clssnms from 'clssnms';
import CardContent from '@material-ui/core/CardContent';
import './App.scss';

const classNames = clssnms('app');

const FeatureCard = ({ feature }) => {
  const { name, release: { done, tickets, type, builds } } = feature;
//     console.log(`Build[${build.type}]: ${buildStatusText(build.status)} - ${link}`);
  return (
    <Card className={classNames('card', { done })}>
      <CardContent>

        <div className={classNames('header')}>
          {name} [{type}]<span> {done ? 'finished' : 'in work'}</span>
        </div>

        <div className={classNames('tickets', {'--hidden': !tickets.length})}>
          Tickets:
          {tickets.map(ticket => (
            <div
              key={ticket.id}
              className={classNames('ticket', {
                '--open': ticket.status === 'open',
                '--closed': ticket.span !== 'open',
              })}
            >
              <a rel="noopener noreferrer" target="_blank" href={ticket.link}>{name}</a>
              <span> ({ticket.status})</span>
            </div>
          ))}
        </div>

        <div className={classNames('builds', {'--hidden': !builds.length})}>
          Builds:
          {builds.map(build => (
            <div className="build-wrapper">
              {build.appLink ? <div className={classNames('build')} style={{order: 0}}><a rel="noopener noreferrer" target="_blank" href={build.appLink}>App link</a></div> : null}
              {build.crxLink ? <div className={classNames('build')} style={{order: 1}}><a rel="noopener noreferrer" target="_blank" href={build.crxLink}>Crx link</a></div> : null}
              <div className={classNames('build')}>
                <a rel="noopener noreferrer" target="_blank" href={build.link}>Build [{build.type}]</a>
                <span style={{color: build.color}}> ({build.status})</span>
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card >
  )
};

class App extends React.Component {
  render() {
    if (!this.props.state) {
      return null;
    }

    return (
      <div className={classNames()}>
        {this.props.state.features.map(feature => <FeatureCard key={feature.name} feature={feature} />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(App);
