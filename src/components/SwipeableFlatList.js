'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, PanResponder, View } from 'react-native';

import SwipeableListItem from './SwipeableListItem';


export default class SwipeableFlatList extends Component {
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.object).isRequired,
		renderItem: PropTypes.func.isRequired,
		renderLeft: PropTypes.func,
		renderRight: PropTypes.func,
		itemBackgroundColor: PropTypes.string,
		refreshing: PropTypes.bool,
		handleLoadmore: PropTypes.func,
		handleRefresh: PropTypes.func,
	};

	static defaultProps = {
		backgroundColor: '#fff',
	};

	_itemRef = undefined;

	handleOpenChild = (ref) => {
		this._itemRef && this._itemRef.close();
		this._itemRef = ref;
	}

	handleCloseChild = () => {
		this._itemRef = undefined;
	}

	handleScroll = () => {
		this._itemRef && this._itemRef.close();
	}

	render = () => {
		const {
			data,
			renderItem,
			renderLeft,
			renderRight,
			itemBackgroundColor,
			style,
			refreshing,
			handleLoadmore,
			handleRefresh,
		} = this.props;
		return (
			<FlatList
				{...this.props}
				data={data}
				renderItem={({ item }) =>
					<SwipeableListItem
						item={renderItem({ item })}
						left={renderLeft && renderLeft({ item })}
						right={renderRight && renderRight({ item })}
						backgroundColor={itemBackgroundColor}
						onOpen={this.handleOpenChild}
						onClose={this.handleCloseChild}
					/>
				}
				onScroll={this.handleScroll}
				style={style}
				keyExtractor={item => item.id}
				onRefresh={this.handleRefresh.bind(this)}
				refreshing={refreshing}
				onEndReachedThreshold={0.5}
				onEndReached={handleLoadmore.bind(this)}
			/>
		);
	}
}
