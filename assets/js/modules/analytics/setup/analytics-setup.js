/**
 * AnalyticsSetup component.
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
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import AccountCreate from './account-create-legacy';
import AnalyticsSetupForm from './setup-form';
import { SvgIcon } from '../../../util';
import { STORE_NAME } from '../datastore';

export default function AnalyticsSetup() {
	const accounts = useSelect( ( select ) => select( STORE_NAME ).getAccounts() ) || [];
	const isCreateAccount = useSelect( ( select ) => select( STORE_NAME ).isCreateAccount() );

	const ViewComponent = ( () => {
		switch ( true ) {
			case ( ! accounts.length || isCreateAccount ) :
				return AccountCreate;
			default:
				return AnalyticsSetupForm;
		}
	} )();

	return (
		<div className="googlesitekit-setup-module googlesitekit-setup-module--analytics">

			<div className="googlesitekit-setup-module__logo">
				<SvgIcon id="analytics" width="33" height="33" />
			</div>

			<h2 className="googlesitekit-heading-3 googlesitekit-setup-module__title">
				{ _x( 'Analytics', 'Service name', 'google-site-kit' ) }
			</h2>

			{ /* { this.renderErrorOrNotice() } */ }

			<ViewComponent />
		</div>
	);
}
