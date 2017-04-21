class PersonsController < ApplicationController
  def index
    @persons = Person.all
    render component: 'Persons', props: { persons: @persons }
  end

  def new
    @person = Person.new
  end

  def show
    @person = Person.find(params[:id])
    render component: 'PersonInfo', props: { person: @person }
  end

  def update
    @person = Person.find(params[:id])

    if @person.update(person_params)
      render component: 'PersonInfo', props: { persons: @persons }
    else
      render component: 'Persons', props: { persons: @persons }
    end
  end

  def create
    @person = Person.new(person_params)
    @person.save
  end

  def destroy
    @person = Person.find(params[:id])
    if @person.destroy
      @persons = Person.all
      render component: 'Persons', props: { persons: @persons }
    else
      render component: 'Persons', props: { persons: @persons }
    end
  end

  private
  def person_params
    params.require(:person).permit(:name, :email, :phone_number)
  end
end
