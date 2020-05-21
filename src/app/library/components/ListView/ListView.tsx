import React, { memo } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { equals } from 'ramda'
import { ListViewProps } from './ListView.props'
const ListViewComponent = (props: ListViewProps) => {
    const { onLoadMore, onRefreshing, canLoadMore = false, refreshing = false } = props;
    const loadMore = () => {
        if (canLoadMore && onLoadMore && typeof onLoadMore === 'function') {
            onLoadMore()
        }
    }
    const refresh = () => {
        if (onRefreshing && typeof onRefreshing === 'function') {
            onRefreshing()
        }
    }
    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.001}
            {...props}
        />
    )
}

export const ListView = memo(ListViewComponent, (prevProps, nextProps) => equals(prevProps, nextProps))

