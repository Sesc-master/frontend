import "reflect-metadata";
import GraphQLType from "./type";
import {ClassConstructor} from "class-transformer";
import GraphQLProperty from "./property";

export const graphQLTypes = new Map<string, GraphQLType>();

const Field = (type?: ClassConstructor<any>) => (object: Object, propertyName: string) => {
    let graphQLType = graphQLTypes.get(object.constructor.name);

    let property;
    if (type) property = new GraphQLProperty(propertyName, graphQLTypes.get(type.name));
    else property = new GraphQLProperty(propertyName);

    if (!property) return;

    if (graphQLType) graphQLType.fields.push(property);
    else graphQLTypes.set(object.constructor.name, new GraphQLType([property]));
};

export default Field;
