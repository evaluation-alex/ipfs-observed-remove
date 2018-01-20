\#IPFS Observed-Remove Set and Map

[![CircleCI](https://circleci.com/gh/wehriam/ipfs-observed-remove.svg?style=svg)](https://circleci.com/gh/wehriam/ipfs-observed-remove) [![npm version](https://badge.fury.io/js/ipfs-observed-remove.svg)](http://badge.fury.io/js/ipfs-observed-remove) [![codecov](https://codecov.io/gh/wehriam/ipfs-observed-remove/branch/master/graph/badge.svg)](https://codecov.io/gh/wehriam/ipfs-observed-remove)

Eventually-consistent, conflict-free replicated data types (CRDT) [implemented](https://github.com/wehriam/ipfs-observed-remove/blob/master/src/index.js) using IPFS and native `Map` and `Set` objects.

This module and the IPFS PubSub system are experimental. If you encounter an issue, fork the repository, [write tests demonstrating](https://github.com/wehriam/ipfs-observed-remove/tree/master/tests) the issue, and create a [pull request](https://github.com/wehriam/ipfs-observed-remove).

```js
const { IpfsObservedRemoveSet } = require('ipfs-observed-remove');

const alice = new ObservedRemoveSet();
const bob = new ObservedRemoveSet();

alice.on('publish', (message) => {
  setTimeout(() => bob.process(message), Math.round(Math.random() * 1000));
});

bob.on('publish', (message) => {
  setTimeout(() => alice.process(message), Math.round(Math.random() * 1000));
});

alice.add('foo');
bob.add('bar');

// Later

alice.has('bar'); // true
bob.has('foo'); // true
```

```js
const { IpfsObservedRemoveMap } = require('ipfs-observed-remove');

const alice = new ObservedRemoveMap();
const bob = new ObservedRemoveMap();

alice.on('publish', (message) => {
  setTimeout(() => bob.process(message), Math.round(Math.random() * 1000));
});

bob.on('publish', (message) => {
  setTimeout(() => alice.process(message), Math.round(Math.random() * 1000));
});

alice.set('a', 1);
bob.add('b', 2);

// Later

alice.get('b'); // 2
bob.get('a'); // 1
```

## Install

`yarn add ipfs-observed-remove`

## Set API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [IpfsObservedRemoveSet](#ipfsobservedremoveset)
    -   [ipfsSync](#ipfssync)
    -   [dump](#dump)
    -   [getIpfsHash](#getipfshash)
    -   [waitForIpfsPeers](#waitforipfspeers)
    -   [ipfsPeerCount](#ipfspeercount)
-   [IpfsObservedRemoveSet#readyPromise](#ipfsobservedremovesetreadypromise)

### IpfsObservedRemoveSet

**Extends ObservedRemoveSet**

Class representing a IPFS Observed Remove Set

Implements all methods and iterators of the native `Set` object and the 'ObservedRemovedSet' class in addition to the following.

See: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set>

See: <https://github.com/wehriam/observed-remove#set-api>

**Parameters**

-   `ipfs` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `topic` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `entries` **Iterable&lt;V>** 
-   `options` **Options**  (optional, default `{}`)

#### ipfsSync

Publish an IPFS hash of an array containing all of the object's insertions and deletions.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>>** 

#### dump

Return a sorted array containing all of the object's insertions and deletions.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>>** 

#### getIpfsHash

Stores and returns an IPFS hash of the current insertions and deletions

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

#### waitForIpfsPeers

Resolves after one or more IPFS peers connects. Useful for testing.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;void>** 

#### ipfsPeerCount

Current number of IPFS pubsub peers.

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### IpfsObservedRemoveSet#readyPromise

Resolves when IPFS topic subscriptions are confirmed.

## Map API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [IpfsObservedRemoveMap](#ipfsobservedremovemap)
    -   [ipfsSync](#ipfssync)
    -   [dump](#dump)
    -   [getIpfsHash](#getipfshash)
    -   [waitForIpfsPeers](#waitforipfspeers)
    -   [ipfsPeerCount](#ipfspeercount)
-   [IpfsObservedRemoveSet#readyPromise](#ipfsobservedremovesetreadypromise)

### IpfsObservedRemoveMap

**Extends ObservedRemoveMap**

Class representing a IPFS Observed Remove Map

Implements all methods and iterators of the native `Map` object and the 'ObservedRemovedSet' class in addition to the following.

See: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map>

See: <https://github.com/wehriam/observed-remove#map-api>

**Parameters**

-   `ipfs` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `topic` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `entries` **Iterable&lt;\[K, V]>** 
-   `options` **Options**  (optional, default `{}`)

#### ipfsSync

Publish an IPFS hash of an array containing all of the object's insertions and deletions.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>>** 

#### dump

Return a sorted array containing all of the object's insertions and deletions.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>>** 

#### getIpfsHash

Stores and returns an IPFS hash of the current insertions and deletions

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 

#### waitForIpfsPeers

Resolves after one or more IPFS peers connects. Useful for testing.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;void>** 

#### ipfsPeerCount

Current number of IPFS pubsub peers.

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### IpfsObservedRemoveSet#readyPromise

Resolves when IPFS topic subscriptions are confirmed.