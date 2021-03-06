/**
 * core/user Data store: user info
 *
 * Site Kit by Google, Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import invariant from 'invariant';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { STORE_NAME } from './constants';

const { createRegistrySelector } = Data;

const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
const RECEIVE_USER_IS_VERIFIED = 'RECEIVE_USER_IS_VERIFIED';

const INITIAL_STATE = {
	user: undefined,
	verified: undefined,
};

export const actions = {
	/**
	 * Stores user info in the datastore.
	 *
	 * Because this is frequently-accessed data, this is usually sourced
	 * from a global variable (`_googlesitekitUserData`), set by PHP
	 * in the `before_print` callback for `googlesitekit-datastore-user`.
	 *
	 * @since n.e.x.t
	 * @private
	 *
	 * @param {Object} userInfo User info, usually supplied via a global variable from PHP.
	 * @return {Object} Redux-style action.
	 */
	receiveUserInfo( userInfo ) {
		invariant( userInfo, 'userInfo is required.' );
		return {
			payload: {
				user: userInfo,
			},
			type: RECEIVE_USER_INFO,
		};
	},

	/**
	 * Stores user verification status in the datastore.
	 *
	 * Because this is frequently-accessed data, this is usually sourced
	 * from a global variable (`_googlesitekitUserData`), set by PHP
	 * in the `before_print` callback for `googlesitekit-datastore-user`.
	 *
	 * @since n.e.x.t
	 * @private
	 *
	 * @param {boolean} userIsVerified User verification status, usually supplied via a global variable from PHP.
	 * @return {Object} Redux-style action.
	 */
	receiveUserIsVerified( userIsVerified ) {
		invariant( userIsVerified !== undefined, 'userIsVerified is required.' );
		return {
			payload: {
				verified: userIsVerified,
			},
			type: RECEIVE_USER_IS_VERIFIED,
		};
	},
};

export const controls = {};

export const reducer = ( state, { type, payload } ) => {
	switch ( type ) {
		case RECEIVE_USER_INFO: {
			const { user } = payload;
			return {
				...state,
				user,
			};
		}
		case RECEIVE_USER_IS_VERIFIED: {
			const { verified } = payload;
			return {
				...state,
				verified,
			};
		}
		default: {
			return { ...state };
		}
	}
};

export const resolvers = {
	*getUser() {
		const { select } = yield Data.commonActions.getRegistry();

		if ( select( STORE_NAME ).getUser() !== undefined ) {
			return;
		}

		if ( ! global._googlesitekitUserData ) {
			global.console.error( 'Could not load core/user info.' );
			return;
		}
		const { user } = global._googlesitekitUserData;
		yield actions.receiveUserInfo( user );
	},

	*isVerified() {
		const { select } = yield Data.commonActions.getRegistry();

		if ( select( STORE_NAME ).isVerified() !== undefined ) {
			return;
		}

		if ( ! global._googlesitekitUserData ) {
			global.console.error( 'Could not load core/user info.' );
			return;
		}
		const { verified } = global._googlesitekitUserData;
		yield actions.receiveUserIsVerified( verified );
	},
};

export const selectors = {
	/**
	 * Gets the user info for the logged in user.
	 *
	 * Returns `undefined` if the user info is not available/loaded.
	 *
	 * Returns an object with the shape when successful:
	 * ```
	 * {
	 *   user: <Object>,
	 *   verified: <Boolean>,
	 * }
	 * ```
	 *
	 * @private
	 * @since n.e.x.t
	 *
	 * @param {Object} state Data store's state.
	 * @return {(Object|undefined)} User info.
	 */
	getUser( state ) {
		const { user } = state;
		return user;
	},

	/**
	 * Gets the ID for this user.
	 *
	 * Returns ID of the user or `undefined` if the user info is not available/loaded.
	 *
	 * @since n.e.x.t
	 *
	 * @param {Object} state Data store's state.
	 * @return {(number|undefined)} The user ID.
	 */
	getID: createRegistrySelector( ( select ) => () => {
		const user = select( STORE_NAME ).getUser();
		return user !== undefined ? user.id : user;
	} ),

	/**
	 * Gets the Name for this user.
	 *
	 * Returns Name of the user or `undefined` if the user info is not available/loaded.
	 *
	 * @since n.e.x.t
	 *
	 * @param {Object} state Data store's state.
	 * @return {(string|undefined)} The user ID.
	 */
	getName: createRegistrySelector( ( select ) => () => {
		const user = select( STORE_NAME ).getUser();
		return user !== undefined ? user.name : user;
	} ),

	/**
	 * Gets the Email for this user.
	 *
	 * Returns email of the user or `undefined` if the user info is not available/loaded.
	 *
	 * @since n.e.x.t
	 *
	 * @param {Object} state Data store's state.
	 * @return {(string|undefined)} The user ID.
	 */
	getEmail: createRegistrySelector( ( select ) => () => {
		const user = select( STORE_NAME ).getUser();
		return user !== undefined ? user.email : user;
	} ),

	/**
	 * Gets the url to the picture for this user.
	 *
	 * Returns url of the user picture or `undefined` if the user info is not available/loaded.
	 *
	 * @since n.e.x.t
	 *
	 * @param {Object} state Data store's state.
	 * @return {(string|undefined)} The user ID.
	 */
	getPicture: createRegistrySelector( ( select ) => () => {
		const user = select( STORE_NAME ).getUser();
		return user !== undefined ? user.picture : user;
	} ),

	/**
	 * Gets the verified status for this user.
	 *
	 * Returns the true if the user is verified, false if not verified, or `undefined` if the user info is not available/loaded.
	 *
	 * @since n.e.x.t
	 *
	 * @param {Object} state Data store's state.
	 * @return {(boolean|undefined)} The user ID.
	 */
	isVerified( state ) {
		const { verified } = state;
		return verified;
	},

};

export default {
	INITIAL_STATE,
	actions,
	controls,
	reducer,
	resolvers,
	selectors,
};
