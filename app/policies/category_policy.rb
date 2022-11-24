class CategoryPolicy < ApplicationPolicy
    attr_reader :user, :scope

    def initialize user, scope
        @user = user
        @scope = scope
    end

    class Scope < Scope
        def resolve
            # if user.role == "super_admin"
            #    scope.all
            # else
            #     raise Pundit::NotAuthorizedError
            # end
            scope.all
        end
    end

    
    def edit?
        user.role == "super_admin"
    end

    def update?
        user.role == "super_admin"
    end

    def destroy?
        user.role == "super_admin"
    end
end