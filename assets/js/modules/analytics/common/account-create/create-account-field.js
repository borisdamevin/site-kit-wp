/**
 * CreateAccountField component.
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
 * Internal dependencies
 */
import {
	Input,
	TextField,
} from '../../../../material-components';
import classnames from 'classnames';

export default function CreateAccountField( {
	hasError,
	value,
	setValue,
	name,
	label,
} ) {
	if ( 'undefined' === typeof value ) {
		return null;
	}

	return (
		<TextField
			className={ classnames(
				'mdc-text-field',
				{ 'mdc-text-field--error': hasError }
			) }
			label={ label }
			name={ name }
			onChange={ ( event ) => {
				setValue( event.target.value, name );
			} }
			outlined
			required
		>
			<Input
				name={ name }
				value={ value }
			/>
		</TextField>
	);
}