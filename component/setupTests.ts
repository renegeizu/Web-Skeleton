import '@testing-library/jest-dom';
import '@babel/plugin-transform-runtime';
import 'mutationobserver-shim';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import buildConnectorMock from './src/service/connectorMock';

//Globals

const globalTyped: any = global

globalTyped.render = render;
globalTyped.waitFor = waitFor;
globalTyped.act = act;
globalTyped.container = screen;
globalTyped.fireEvent = fireEvent;

//Mock the Connector

buildConnectorMock();