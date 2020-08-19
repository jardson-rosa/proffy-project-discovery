module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    // Inserir dados na tabela de proffys
    // Só é possível usar await numa função se ela for async, casso contrário não é possível.
    const insertedProffy = await db.run(` 
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `) 

    const proffy_id = insertedProffy.lastID

    // Inserir dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO Classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    // Inserir dados na tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    // Aqui vou executar todos os db.run() das class_schedule
    await Promise.all(insertedAllClassScheduleValues)
}