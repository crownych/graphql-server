import { GraphQLScalarType, Kind } from "graphql";

/*
 * interface GraphQLScalarTypeConfig<TInternal, TExternal> {
 *    name: string;
 *    description?: Maybe<string>;
 *    // Serializes an internal value to include in a response.
 *    serialize: GraphQLScalarSerializer<TExternal>;
 *    // Parses an externally provided value to use as an input.
 *    parseValue?: GraphQLScalarValueParser<TInternal>;
 *    // Parses an externally provided literal value to use as an input.
 *    parseLiteral?: GraphQLScalarLiteralParser<TInternal>;
 *    astNode?: Maybe<ScalarTypeDefinitionNode>;
 *    extensionASTNodes?: Maybe<ReadonlyArray<ScalarTypeExtensionNode>>;
 * }
 */

const isTimestamp: Function = (value: number) => {
    //support IEEE-754 safe integer
    return Number.isSafeInteger(value);
};

const Timestamp = new GraphQLScalarType({
    name: "Timestamp",
    description: `The unix time stamp is a way to track time as a running total of seconds. This count starts at the
     Unix Epoch on January 1st, 1970 at UTC. Therefore, the unix time stamp is merely the number of seconds between a
     particular date and the Unix Epoch. It should also be pointed out (thanks to the comments from visitors to this
     site) that this point in time technically does not change no matter where you are located on the globe. This is
     very useful to computer systems for tracking and sorting dated information in dynamic and distributed applications
     both online and client side.`,
    serialize(value: any) {     // value sent to the client
        console.log(`serialize() - value: ${value}`);
        return parseInt(value, 10);
    },
    parseValue(value: any) {    // value from the client (透過 variable 送上來的走這)
        console.log(`parseValue() - value: ${value}`);
        if (value) {
            return value.toString();
        }
        return Date.now.toString();
    },
    parseLiteral(ast: any): string {    // value from the client (inline arguments: 透過 graphql query/mutation 語法中直接指定值的走這 )
        console.log("parseLiteral() - value: ", ast);
        if (ast.kind !== Kind.INT) {
            throw new TypeError("invalid type: should be INT");
        }

        // validate timestamp
        if (!isTimestamp(parseInt(ast.value, 10))) {
            throw new TypeError(`invalid timestamp: ${ast.value}`);
        }
        // return a literal value, such as 1 or 'static string'
        return ast.value.toString();
    }
});

export {
    Timestamp
};
