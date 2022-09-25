import { Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"
import { UserContact } from "./userContact.entity"

@Entity("users")
@Unique(["email"])
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    phone_number: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(type => UserContact, contact => contact.user, {
        eager: true
    })
    contacts: UserContact[]

}

export { User }
