import prisma from '../../prisma/prismaClient.js';

export const obtenerTodos = async ({ page = 1, limit = 10, nombre = '' } = {}) => {
    const skip = (page - 1) * limit;
    const where = nombre
        ? { nombre: { contains: nombre, mode: 'insensitive' } }
        : {};

    return await prisma.reloj.findMany({
        skip,
        take: limit,
        where,
    });
};

export const obtenerPorId = async id => {
    const reloj = await prisma.reloj.findUnique({
        where: { id: parseInt(id) }
    });

    if (!reloj) throw new Error('NOT_FOUND');
    return reloj;
};

export const crear = async data => {
    return await prisma.reloj.create( {data} );
};

export const actualizar = async (id, data) => {
    const existe = await prisma.reloj.findUnique( {where: { id: parseInt(id) }});
    if (!existe) throw new Error('NOT_FOUND');

    return await prisma.reloj.update({
        where: {id: parseInt(id) },
        data
    });
};

export const eliminar = async id => {
    const existe = await prisma.reloj.findUnique( {where: {id: parseInt(id)} });
    if (!existe) throw new Error('NOT_FOUND');

    return await prisma.reloj.delete({
        where: { id: parseInt(id) }
    });
};